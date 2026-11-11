import { test, expect } from '@playwright/test';
import assert from 'node:assert/strict';

const baseURL = 'http://127.0.0.1:5178';
test('cadastro, persistência, formulários, catálogos e logout', async ({page}) => {
  const requests = [];
  await page.route('**/api/**', route => { requests.push(route.request().url()); return route.abort(); });
  test.setTimeout(90000);
  const objetoNome = `Objeto navegador ${Date.now()}`;
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(baseURL);
  await page.getByRole('button',{name:'Sair',exact:true}).click();
  await page.getByRole('button',{name:'Criar uma conta',exact:true}).click();
  await page.locator('[name=matricula]').fill(String(Date.now()));
  await page.locator('[name=nome]').fill('Aluno Navegador');
  await page.locator('[name=email]').fill('navegador@example.com');
  await page.locator('[name=nascimento]').fill('2005-02-20');
  await page.locator('[name=senha]').fill('senha-teste-123');
  await page.getByRole('button',{name:'Cadastrar',exact:true}).click();
  await page.getByRole('heading',{name:'Bom te ver por aqui, Aluno Navegador!'}).waitFor();
  console.log('Cadastro e início OK');
  await page.getByRole('link',{name:'Agenda Escolar',exact:true}).click();
  await page.getByRole('button',{name:'+ Novo compromisso'}).click();
  await page.getByPlaceholder('Ex.: Prova de matemática').fill('Compromisso navegador');
  await page.locator('input[type=date]').fill('2026-11-25');
  await page.getByRole('button',{name:'Salvar compromisso',exact:true}).click();
  await page.waitForFunction(()=>!document.querySelector('input[placeholder="Ex.: Prova de matemática"]'));
  await page.reload();
  await page.getByText('Compromisso navegador',{exact:true}).first().waitFor();
  console.log('Agenda persistiu após recarregar OK');
  await page.goto(baseURL+'/configuracoes');
  await page.locator('input').filter({visible:true}).first().fill('Aluno Atualizado');
  await page.getByRole('button',{name:'Salvar alterações',exact:true}).click();
  await page.getByText('Configurações salvas com sucesso!').waitFor();
  await page.reload();
  await page.getByText('Olá, Aluno Atualizado',{exact:true}).waitFor();
  console.log('Perfil persistiu OK');
  await page.goto(baseURL+'/clubes/robotica/inscricao');
  await page.locator('[name=experiencia][value=iniciante]').check();
  await page.locator('[name=motivo]').fill('Aprender robótica');
  await page.locator('input[type=checkbox]').check();
  await page.getByRole('button',{name:'Confirmar inscrição',exact:true}).click();
  await page.getByText('🎉 Inscrição registrada com sucesso!').waitFor();
  console.log('Inscrição OK');
  await page.goto(baseURL+'/clubes/propor');
  for(const [key,value] of Object.entries({nome:'Clube Navegador',lider:'Aluno Atualizado',local:'Sala 1',horario:'Sexta 13h',atividades:'Programar',objetivo:'Aprender'})) await page.locator(`[name=${key}]`).fill(value);
  await page.locator('[name=categoria][value=Tecnologia]').check();
  await page.getByRole('button',{name:'Salvar proposta',exact:true}).click();
  await page.getByRole('heading',{name:'Proposta salva!'}).waitFor();
  console.log('Proposta OK');
  await page.goto(baseURL+'/informar-objeto');
  for(const [key,value] of Object.entries({objeto:objetoNome,local:'Biblioteca',data:'2020-01-01',descricao:'Teste navegador',retirada:'Secretaria'})) await page.locator(`[name=${key}]`).fill(value);
  await page.locator('[name=categoria]').selectOption('Outros');
  await page.locator('button[type=submit]').click();
  await page.getByRole('heading',{name:objetoNome,exact:true}).waitFor();
  const objeto = page.locator('article').filter({has: page.getByRole('heading',{name:objetoNome,exact:true})});
  await objeto.getByRole('button',{name:'Marcar como devolvido',exact:true}).click();
  await page.getByText('Situação atualizada.',{exact:true}).waitFor();
  await page.reload();
  await page.getByRole('button',{name:'Marcar como disponível',exact:true}).waitFor();
  console.log('Objeto e situação persistiram OK');
  for(const route of ['/clubes','/horarios','/datas-comemorativas']) { await page.goto(baseURL+route); await page.getByRole('navigation').waitFor(); }
  await page.getByRole('button',{name:'Sair',exact:true}).click();
  await page.getByRole('heading',{name:'Entrar no Portal do Aluno'}).waitFor();
  await page.goto(baseURL+'/agenda');
  await page.getByRole('heading',{name:'Entrar no Portal do Aluno'}).waitFor();
  assert.deepEqual(errors,[]);
  assert.deepEqual(requests,[]);
  const salvo = await page.evaluate(() => localStorage.getItem('portal-aluno:demo:v1'));
  assert.ok(!salvo.includes('senha-teste-123'));
  await page.getByRole('button',{name:'Entrar na demonstração sem credenciais'}).click();
  await expect(page.getByRole('heading',{name:'Bom te ver por aqui, Aluno Atualizado!'})).toBeVisible();
  console.log('Catálogos, logout, proteção de rotas, sem erros JavaScript OK');
});

test('rotas, links, erros de rota e layout móvel sem API', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  const requests = [];
  await page.route('**/api/**', route => { requests.push(route.request().url()); return route.abort(); });
  for (const route of ['/', '/horarios', '/datas-comemorativas', '/eventos', '/clubes', '/clubes/robotica', '/clubes/robotica/inscricao', '/clubes/propor', '/agenda', '/achados-e-perdidos', '/informar-objeto', '/configuracoes']) {
    await page.goto(route);
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('heading', {level: 1})).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await page.goto('/clubes/inexistente');
  await expect(page.getByRole('heading', {name: 'Clube não encontrado'})).toBeVisible();
  await page.goto('/pagina-inexistente');
  await expect(page.getByText('Página não encontrada.', {exact: false})).toBeVisible();
  await page.getByRole('link', {name: 'Voltar ao início'}).click();
  await expect(page.getByRole('heading', {name: 'Bom te ver por aqui, Aluno demonstração!'})).toBeVisible();
  expect(requests).toEqual([]);
});

test('dados antigos preservados e falha ao salvar não anuncia sucesso', async ({page}) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('agenda-escolar', '[{"titulo":"dado antigo"}]');
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      if (key === 'portal-aluno:demo:v1') throw new DOMException('Cheio', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await page.getByRole('link', {name: 'Agenda Escolar', exact: true}).click();
  await page.getByRole('button', {name: '+ Novo compromisso'}).click();
  await page.getByPlaceholder('Ex.: Prova de matemática').fill('Não deve salvar');
  await page.locator('input[type=date]').fill('2026-11-25');
  await page.getByRole('button', {name: 'Salvar compromisso', exact: true}).click();
  await expect(page.getByRole('alert')).toContainText('Não foi possível salvar');
  expect(await page.evaluate(() => localStorage.getItem('agenda-escolar'))).toBe('[{"titulo":"dado antigo"}]');
});
