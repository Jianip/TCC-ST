import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AchadosPerdidos from "./paginas/achados-perdidos";
import InformarObjeto from "./paginas/informar-objeto";
import Agenda from "./paginas/agenda";
import Clubes from "./paginas/clubes";
import DetalhesClube from "./paginas/detalhes-clube";
import DatasComemorativas from "./paginas/datas-comemorativas";
import Horarios from "./paginas/horarios";
import Inicio from "./paginas/inicio";
import Configuracoes from "./paginas/configuracoes";

import { autenticar, type Usuario } from "./dados/autenticacao";
import { definirUsuarioPerfil } from "./dados/perfil";

import { modoDemonstracao, usuarioDemonstracao } from "./dados/demonstracao";

import Login from "./paginas/login";

export default function App() {
  const navegar = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroSessao, setErroSessao] = useState("");

  async function verificarSessao() {
    setCarregando(true);
    setErroSessao("");
    if (modoDemonstracao) {
      definirUsuarioPerfil(usuarioDemonstracao);
      setUsuario(usuarioDemonstracao);
      setCarregando(false);
      return;
    }

    try {
      const atual = await autenticar("session");
      definirUsuarioPerfil(atual);
      setUsuario(atual);
    } catch (erro) {
      setErroSessao(erro instanceof Error ? erro.message : "Falha ao verificar sessão.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { void verificarSessao(); }, []);

  function entrar(atual: Usuario) {
    definirUsuarioPerfil(atual);
    setUsuario(atual);
    navegar("/", { replace: true });
  }

  async function sair() {
    try {
      if (!modoDemonstracao) {
        await autenticar("logout");
      }
      definirUsuarioPerfil(null);
      setUsuario(null);
      navegar("/login", { replace: true });
    } catch (erro) {
      setErroSessao(erro instanceof Error ? erro.message : "Não foi possível sair.");
    }
  }

  const [modoEscuro, setModoEscuro] = useState(
    localStorage.getItem("tema") === "escuro",
  );

  function mudarTema() {
    setModoEscuro(!modoEscuro);
    localStorage.setItem("tema", modoEscuro ? "claro" : "escuro");
  }

  if (carregando) return <main className="p-8 text-center" role="status">Verificando sua sessão...</main>;
  if (erroSessao) return <main className="p-8 text-center"><p role="alert">{erroSessao}</p><button className="mt-4 rounded bg-blue-800 px-5 py-2 text-white" onClick={() => void verificarSessao()}>Tentar novamente</button></main>;

  if (!usuario) {
    return (
      <Routes>
        <Route path="/login" element={<Login entrar={entrar} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className={modoEscuro ? "modo-escuro" : ""}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/login"
          element={modoDemonstracao ? <Login entrar={entrar} /> : <Navigate to="/" replace />}
        />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/datas-comemorativas" element={<DatasComemorativas />} />
        <Route path="/eventos" element={<Navigate to="/datas-comemorativas" replace />} />
        <Route path="/clubes" element={<Clubes />} />
        <Route path="/clubes/:clube" element={<DetalhesClube />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/achados-e-perdidos" element={<AchadosPerdidos />} />
        <Route path="/informar-objeto" element={<InformarObjeto />} />
        <Route
          path="/configuracoes"
          element={
            <Configuracoes
              modoEscuro={modoEscuro}
              mudarTema={mudarTema}
              sair={sair}
            />
          }
        />
      </Routes>
    </div>
  );
}
