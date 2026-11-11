import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { api, mensagemErro, modoDemo } from "../servicos/api";
import { usePortal, type Usuario } from "../servicos/portal";
export default function Login() {
  const {usuario,setUsuario} = usePortal();
  const [cadastro,setCadastro] = useState(false);
  const [erro,setErro] = useState("");
  const [enviando,setEnviando] = useState(false);
  if(usuario) return <Navigate to="/" replace />;
  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(enviando) return;
    const input = Object.fromEntries(new FormData(event.currentTarget));
    setEnviando(true); setErro("");
    try { const result = await api<{usuario: Usuario}>(cadastro ? "/auth/register" : "/auth/login", "POST", input); setUsuario(result.usuario); }
    catch(error) { setErro(mensagemErro(error)); }
    finally { setEnviando(false); }
  }
  async function demonstrar() {
    setEnviando(true); setErro("");
    try { const result = await api<{usuario: Usuario}>("/auth/login", "POST", {}); setUsuario(result.usuario); }
    catch(error) { setErro(mensagemErro(error)); }
    finally { setEnviando(false); }
  }
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
    <form onSubmit={enviar} className="w-full max-w-md space-y-5 rounded-2xl border bg-white p-8 shadow-sm">
      <img src="/imagens/logo-sanico.jpg" alt="Escola Sanico Teles" className="mx-auto h-20 w-20 rounded-full" />
      <h1 className="text-2xl font-bold text-blue-800">{cadastro ? "Criar conta" : "Entrar no Portal do Aluno"}</h1>
      {modoDemo && <button type="button" disabled={enviando} onClick={demonstrar} className="rounded bg-amber-100 p-3 text-amber-950">Entrar na demonstração sem credenciais</button>}
      <label className="block">Matrícula<input name="matricula" required pattern="[0-9]{1,30}" inputMode="numeric" autoComplete="username" maxLength={30} className="mt-1 w-full rounded border p-2" /></label>
      {cadastro && <>
        <label className="block">Nome completo<input name="nome" required minLength={3} maxLength={120} autoComplete="name" className="mt-1 w-full rounded border p-2" /></label>
        <label className="block">E-mail<input name="email" required type="email" maxLength={254} autoComplete="email" className="mt-1 w-full rounded border p-2" /></label>
        <label className="block">Nascimento<input name="nascimento" required type="date" min="1900-01-01" className="mt-1 w-full rounded border p-2" /></label>
      </>}
      <label className="block">Senha<input name="senha" required type="password" minLength={8} maxLength={128} autoComplete={cadastro ? "new-password" : "current-password"} className="mt-1 w-full rounded border p-2" /></label>
      {erro && <p role="alert" className="text-red-700">{erro}</p>}
      <button disabled={enviando} className="w-full rounded bg-blue-700 p-3 font-bold text-white disabled:opacity-50">{enviando ? "Aguarde…" : cadastro ? "Cadastrar" : "Entrar"}</button>
      <button disabled={enviando} type="button" onClick={() => {setCadastro(!cadastro);setErro("");}} className="text-blue-700 underline">{cadastro ? "Já tenho uma conta" : "Criar uma conta"}</button>
    </form>
  </main>;
}
