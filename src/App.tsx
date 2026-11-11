import Login from "./paginas/login";
import { usePortal } from "./servicos/portal";
import { lerPreferencia, salvarPreferencia } from "./servicos/api";
import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AchadosPerdidos from "./paginas/achados-perdidos";
import InformarObjeto from "./paginas/informar-objeto";
import Agenda from "./paginas/agenda";
import Clubes from "./paginas/clubes";
import DetalhesClube from "./paginas/detalhes-clube";
import ProporClube from "./paginas/propor-clube";
import InscricaoClube from "./paginas/inscricao-clube";
import DatasComemorativas from "./paginas/datas-comemorativas";
import Horarios from "./paginas/horarios";
import Inicio from "./paginas/inicio";
import Configuracoes from "./paginas/configuracoes";
import Cardapio from "./paginas/cardapio";

export default function App() {
  const [modoEscuro, setModoEscuro] = useState(
    lerPreferencia("tema") === "escuro",
  );

  function mudarTema() {
    setModoEscuro(!modoEscuro);
    salvarPreferencia("tema", modoEscuro ? "claro" : "escuro");
  }

  const { usuario } = usePortal();
  const location = useLocation();
  if (!usuario && location.pathname !== "/login") return <Navigate to="/login" replace />;

  return (
    <div className={modoEscuro ? "modo-escuro" : ""}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/datas-comemorativas" element={<DatasComemorativas />} />
        <Route path="/eventos" element={<Navigate to="/datas-comemorativas" replace />} />
        <Route path="/clubes" element={<Clubes />} />
        <Route path="/clubes/propor" element={<ProporClube />} />
        <Route path="/clubes/:clube" element={<DetalhesClube />} />
        <Route path="/clubes/:clube/inscricao" element={<InscricaoClube />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/achados-e-perdidos" element={<AchadosPerdidos />} />
        <Route path="/informar-objeto" element={<InformarObjeto />} />
        <Route
          path="/configuracoes"
          element={
            <Configuracoes
              modoEscuro={modoEscuro}
              mudarTema={mudarTema}
            />
          }
        />
        <Route path="*" element={<main className="p-10">Página não encontrada. <a href="/">Voltar ao início</a></main>} />
      </Routes>
    </div>
  );
}
