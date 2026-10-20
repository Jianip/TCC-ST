import type { Usuario } from "./autenticacao";


export const modoDemonstracao = import.meta.env.VITE_MODO_DEMONSTRACAO === "true";

export const usuarioDemonstracao: Usuario = {
  id: 0,
  nome: "Aluno",
  matricula: "demonstracao",
  email: "",
};
