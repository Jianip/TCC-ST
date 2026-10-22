import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const scrypt = promisify(scryptCallback);
const hashToken = (token) => createHash('sha256').update(token).digest('hex');
const duration = 7 * 24 * 60 * 60;

export function createAuthServer(databasePath = 'server/data/portal.sqlite') {
  mkdirSync(dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec(`PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY, matricula TEXT NOT NULL UNIQUE, nome TEXT NOT NULL,
      nascimento TEXT NOT NULL, salt TEXT NOT NULL, password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, expires INTEGER NOT NULL
    );`);
  if (!db.prepare('PRAGMA table_info(users)').all().some(column => column.name === 'email')) {
    db.exec("ALTER TABLE users ADD COLUMN email TEXT NOT NULL DEFAULT ''");
  }
  const attempts = new Map();
  const server = createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const reply = (status, body) => { res.writeHead(status); res.end(JSON.stringify(body)); };
    const token = /(?:^|;\s*)portal_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '')?.[1];
    const cookie = (value, age) => res.setHeader('Set-Cookie', `portal_session=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${age}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
    const publicUser = (user) => ({ id: user.id, nome: user.nome, matricula: user.matricula, email: user.email });
    try {
      db.prepare('DELETE FROM sessions WHERE expires <= ?').run(Date.now());
      if (req.method === 'GET' && req.url === '/api/auth/session') {
        const user = token && db.prepare('SELECT users.* FROM users JOIN sessions ON users.id = sessions.user_id WHERE sessions.token = ? AND sessions.expires > ?').get(hashToken(token), Date.now());
        return reply(200, { usuario: user ? publicUser(user) : null });
      }
      if (req.method !== 'POST' || !['/api/auth/login', '/api/auth/register', '/api/auth/logout'].includes(req.url)) return reply(404, { mensagem: 'Rota não encontrada.' });
      const origin = req.headers.origin;
      if ((origin && new URL(origin).host !== req.headers.host) || req.headers['sec-fetch-site'] === 'cross-site') return reply(403, { mensagem: 'Origem não permitida.' });
      if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, { mensagem: 'Envie os dados em JSON.' });
      if (req.url === '/api/auth/logout') {
        if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(hashToken(token));
        cookie('', 0);
        return reply(200, { usuario: null });
      }
      const now = Date.now();
      for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
      const key = req.socket.remoteAddress;
      const attempt = attempts.get(key) || { count: 0, until: now + 15 * 60_000 };
      if (attempt.count >= 30) return reply(429, { mensagem: 'Muitas tentativas. Aguarde 15 minutos e tente novamente.' });
      attempt.count++;
      attempts.set(key, attempt);
      let body = '';
      for await (const chunk of req) {
        body += chunk;
        if (Buffer.byteLength(body) > 8192) return reply(413, { mensagem: 'Dados muito grandes.' });
      }
      let input;
      try { input = JSON.parse(body); } catch { return reply(400, { mensagem: 'Dados inválidos.' }); }
      if (!input || typeof input !== 'object') return reply(400, { mensagem: 'Dados inválidos.' });
      const { matricula, senha, nome, nascimento } = input;
      if (typeof matricula !== 'string' || !/^[0-9]{1,30}$/.test(matricula) || typeof senha !== 'string' || senha.length < 8 || senha.length > 128) return reply(400, { mensagem: 'Informe uma matrícula numérica e uma senha de 8 a 128 caracteres.' });
      let user;
      if (req.url === '/api/auth/register') {
        const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
        if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { mensagem: 'Informe um e-mail válido.' });
        const date = typeof nascimento === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(nascimento) ? new Date(`${nascimento}T00:00:00Z`) : new Date(NaN);
        if (typeof nome !== 'string' || nome.trim().length < 3 || nome.trim().length > 120 || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== nascimento || nascimento < '1900-01-01' || date > new Date()) return reply(400, { mensagem: 'Confira o nome e a data de nascimento.' });
        const salt = randomBytes(16).toString('hex');
        const password = (await scrypt(senha, salt, 64)).toString('hex');
        try {
          const result = db.prepare('INSERT INTO users (matricula, nome, nascimento, salt, password, email) VALUES (?, ?, ?, ?, ?, ?)').run(matricula, nome.trim(), nascimento, salt, password, email);
          user = { id: Number(result.lastInsertRowid), nome: nome.trim(), matricula, email };
        } catch (error) {
          if (String(error).includes('UNIQUE')) return reply(409, { mensagem: 'Essa matrícula já tem uma conta.' });
          throw error;
        }
      } else {
        user = db.prepare('SELECT * FROM users WHERE matricula = ?').get(matricula);
        const computed = await scrypt(senha, user?.salt || 'unknown-account-salt', 64);
        if (!user || !timingSafeEqual(Buffer.from(user.password, 'hex'), computed)) return reply(401, { mensagem: 'Matrícula ou senha incorreta.' });
      }
      if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(hashToken(token));
      const session = randomBytes(32).toString('hex');
      db.prepare('INSERT INTO sessions (token, user_id, expires) VALUES (?, ?, ?)').run(hashToken(session), user.id, Date.now() + duration * 1000);
      cookie(session, duration);
      return reply(req.url === '/api/auth/register' ? 201 : 200, { usuario: publicUser(user) });
    } catch (error) {
      console.error('Falha na autenticação:', error.message);
      if (!res.headersSent) reply(500, { mensagem: 'Não foi possível concluir. Tente novamente.' });
    }
  });
  server.on('close', () => db.close());
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  createAuthServer().listen(Number(process.env.PORT || 3001), '127.0.0.1', () => console.log('API do portal em http://127.0.0.1:3001'));
}
