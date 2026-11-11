// Adaptador demonstrativo executado somente no navegador. Não autentica usuários.
import { clubes } from "../dados/clubes";
import { datas } from "../dados/datas-comemorativas";
import { grades } from "../dados/horarios";
import type { Usuario } from "./portal";

type Item = Record<string, unknown> & { id?: number | string };
type Estado = {
  versao: 1;
  entrou: boolean;
  usuario: Usuario;
  agenda: Item[];
  objetos: Item[];
  propostas: Item[];
  inscricoes: Item[];
};
const chave = "portal-aluno:demo:v1";
function inicial(): Estado {
  return {
    versao: 1, entrou: true,
    usuario: {id: 1, matricula: "000001", nome: "Aluno demonstração", email: "aluno@example.com", foto: "/imagens/perfil-tcc.png"},
    agenda: [{id: 1, titulo: "Preparar apresentação do TCC", data: "2026-11-25", descricao: "Compromisso fictício para demonstrar a agenda.", cor: "#bfdbfe"}],
    objetos: [{id: "exemplo-mochila", nome: "Mochila roxa (exemplo)", categoria: "Material escolar", local: "Biblioteca", data: "2026-08-19", descricao: "Objeto fictício para demonstrar a interface.", retirada: "Secretaria", foto: "/imagens/mochila-roxa.jpeg", devolvido: false, podeEditar: true}],
    propostas: [], inscricoes: [],
  };
}
function ler(): Estado {
  try {
    const texto = localStorage.getItem(chave);
    if (texto === null) return inicial();
    const estado = JSON.parse(texto) as Estado;
    if (estado?.versao !== 1 || typeof estado.entrou !== "boolean" ||
      !estado.usuario || ![estado.usuario.nome, estado.usuario.email, estado.usuario.foto].every(v => typeof v === "string") ||
      ![estado.agenda, estado.objetos, estado.propostas, estado.inscricoes].every(v => Array.isArray(v) && v.every(i => i && typeof i === "object"))) throw new Error();
    return estado;
  } catch { throw new Error("Não foi possível ler os dados demonstrativos locais. Verifique o armazenamento do navegador; seus dados não foram substituídos."); }
}
function salvar(estado: Estado) {
  try { localStorage.setItem(chave, JSON.stringify(estado)); }
  catch { throw new Error("Não foi possível salvar neste navegador. O armazenamento pode estar cheio ou bloqueado; tente uma foto menor."); }
}
export function respostaMock(path: string, method: string, body?: unknown): unknown {
  if (path === "/catalogo" && method === "GET") return {
    clubes, datas: datas.map(d => ({...d, ano: 2026})),
    grades: grades.map(g => ({...g, aulas: g.aulas.map(a => a.map(d => ({disciplina: d.disciplina === "????" ? "A confirmar" : d.disciplina})))})),
  };
  const estado = ler();
  const input = (body ?? {}) as Record<string, unknown>;
  if (path === "/auth/session") return {usuario: estado.entrou ? estado.usuario : null};
  if (["/auth/login", "/auth/register", "/auth/logout"].includes(path) && method === "POST") {
    // Simula apenas a navegação. Senha, matrícula e nascimento não são armazenados.
    estado.entrou = path !== "/auth/logout";
    if (path === "/auth/register") {
      estado.usuario.nome = String(input.nome || "Aluno demonstração");
      estado.usuario.email = String(input.email || "aluno@example.com");
    }
    salvar(estado);
    return {usuario: estado.entrou ? estado.usuario : null};
  }
  if (path === "/perfil" && method === "PUT") {
    estado.usuario = {...estado.usuario, nome: String(input.nome), email: String(input.email), foto: String(input.foto)};
    salvar(estado); return estado.usuario;
  }
  const match = /^\/(agenda|objetos|propostas|inscricoes)(?:\/([^/]+))?$/.exec(path);
  if (!match) throw new Error("Esta operação ainda não possui demonstração local.");
  const nome = match[1] as "agenda" | "objetos" | "propostas" | "inscricoes";
  const id = match[2];
  const lista = estado[nome];
  if (method === "GET") return lista;
  let result: unknown = {ok: true};
  if (method === "POST") {
    const novo: Item = {...input, id: nome === "objetos" ? crypto.randomUUID() : Date.now()};
    if (nome === "objetos") Object.assign(novo, {devolvido: false, podeEditar: true});
    // Uma única inscrição demonstrativa por clube, sem regras de matrícula ou aprovação.
    if (nome === "inscricoes") estado.inscricoes = lista.filter(i => i.clube !== input.clube);
    estado[nome].push(novo); result = novo;
  } else {
    const index = lista.findIndex(i => String(i.id) === id);
    if (index === -1) throw new Error("Registro demonstrativo não encontrado.");
    if (method === "DELETE") lista.splice(index, 1);
    else if (method === "PUT" || method === "PATCH") lista[index] = {...lista[index], ...input, id: lista[index].id};
    else throw new Error("Operação demonstrativa indisponível.");
  }
  salvar(estado); return result;
}
