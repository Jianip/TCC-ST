import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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

export default function App() {
  const [modoEscuro, setModoEscuro] = useState(
    localStorage.getItem("tema") === "escuro",
  );

  function mudarTema() {
    setModoEscuro(!modoEscuro);
    localStorage.setItem("tema", modoEscuro ? "claro" : "escuro");
  }

  return (
    <div className={modoEscuro ? "modo-escuro" : ""}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/login"
          element={<Navigate to="/" replace />}
        />
        <Route path="/horarios" element={<Horarios />} />
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
      </Routes>
    </div>
  );
}
