import { Link, NavLink } from "react-router-dom";
import { pegarPerfil } from "../dados/perfil";

const abas = [
  { caminho: "/", nome: "Início" },
  { caminho: "/datas-comemorativas", nome: "Datas Comemorativas" },
  { caminho: "/clubes", nome: "Clubes" },
  { caminho: "/agenda", nome: "Agenda Escolar" },
  { caminho: "/horarios", nome: "Horários Escolares" },
  { caminho: "/achados-e-perdidos", nome: "Achados e Perdidos" },
];

export default function Cabecalho() {
  const perfil = pegarPerfil();

  return (
    <nav aria-label="Navegação principal" className="bg-[#154a99] px-5 py-3 text-white shadow-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 lg:grid-cols-[auto_1fr_auto]">
        <Link to="/" aria-label="Página inicial">
          <img src="/imagens/logo-sanico.jpg" alt="Logo da escola" className="h-12 w-12 rounded-full object-cover" />
        </Link>

        <div className="col-span-2 row-start-2 min-w-0 text-center lg:col-span-1 lg:col-start-2 lg:row-start-1">
          <p className="mb-3 text-lg font-bold tracking-wide sm:text-xl">Escola Estadual Sanico Teles</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold">
            {abas.map((aba) => (
              <NavLink
                key={aba.caminho}
                to={aba.caminho}
                end={aba.caminho === "/"}
                className={({ isActive }) => isActive ? "underline underline-offset-4" : "hover:underline"}
              >
                {aba.nome}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="col-start-2 row-start-1 flex items-center justify-end gap-2 lg:col-start-3">
          <span className="max-w-40 truncate text-xs sm:max-w-52" title={perfil.nome}>Olá, {perfil.nome}</span>
          <img src={perfil.foto} alt="Foto do perfil" className="h-9 w-9 shrink-0 rounded-full object-cover" />
          <NavLink to="/configuracoes" aria-label="Configurações" className="rounded p-1 text-xl hover:bg-blue-800">⚙️</NavLink>
        </div>
      </div>
    </nav>
  );
}
