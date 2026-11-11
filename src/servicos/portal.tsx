import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, mensagemErro } from "./api";
import type { clubes } from "../dados/clubes";
import type { grades } from "../dados/horarios";
import type { datas } from "../dados/datas-comemorativas";
export type Usuario = { id: number; matricula: string; nome: string; email: string; foto: string };
type Catalogo = { clubes: typeof clubes; grades: typeof grades; datas: (typeof datas[number] & {ano: number})[] };
type Portal = { usuario: Usuario | null; setUsuario: (usuario: Usuario | null) => void; catalogo: Catalogo };
const Contexto = createContext<Portal | null>(null);
export function PortalProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [catalogo, setCatalogo] = useState<Catalogo | null>(null);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);
  useEffect(() => {
    let active = true;
    setErro("");
    Promise.all([api<{usuario: Usuario | null}>("/auth/session"), api<Catalogo>("/catalogo")])
      .then(([session, catalog]) => {
        if (!active) return;
        if (!catalog.grades.length) throw new Error("O catálogo de turmas está vazio. Confira os dados fornecidos pela API.");
        setUsuario(session.usuario); setCatalogo(catalog);
      }).catch(error => { if(active) setErro(mensagemErro(error)); });
    return () => { active = false; };
  }, [tentativa]);
  useEffect(() => {
    const expired = () => setUsuario(null);
    window.addEventListener("sessao-expirada", expired);
    return () => window.removeEventListener("sessao-expirada", expired);
  }, []);
  if (erro) return <main className="p-10"><p role="alert">{erro}</p><button className="mt-4 rounded bg-blue-700 p-3 text-white" onClick={() => setTentativa(tentativa + 1)}>Tentar novamente</button></main>;
  if (!catalogo) return <p role="status" className="p-10">Carregando portal…</p>;
  return <Contexto.Provider value={{usuario, setUsuario, catalogo}}>{children}</Contexto.Provider>;
}
export function usePortal() {
  const portal = useContext(Contexto);
  if (!portal) throw new Error("PortalProvider ausente");
  return portal;
}
export function usePerfil() {
  const {usuario} = usePortal();
  if (!usuario) throw new Error("Sessão ausente");
  return usuario;
}
