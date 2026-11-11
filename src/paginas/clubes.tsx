import { usePortal } from "../servicos/portal";
import Cabecalho from "../componentes/cabecalho";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Clubes() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  function mostrarClube(texto: string, categoriaClube: string) {
    const encontrouTexto = texto.toLowerCase().includes(busca.toLowerCase());
    const encontrouCategoria = categoria === "Todos" || categoria === categoriaClube;

    return encontrouTexto && encontrouCategoria;
  }

  const { catalogo: { clubes } } = usePortal();
  const filtrados = clubes.filter(c => mostrarClube(`${c.nome} ${c.descricao} ${c.categoria}`, c.categoria));

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Cabecalho />

      <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-9 sm:px-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700">
            Clubes de Protagonismo
          </h1>

          <p className="mt-3 font-semibold text-slate-700">
            Liderança, criatividade e trabalho em equipe no seu dia a dia escolar.
          </p>

          <div className="relative mx-auto mt-8 max-w-md">
            <label htmlFor="busca-clubes" className="sr-only">
              Pesquisar clube ou tema
            </label>

            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-3 top-3 h-5 w-5">
              <circle cx="10" cy="10" r="6" />

              <path d="m15 15 5 5" />

            </svg>

            <input
              id="busca-clubes"
              type="search"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              placeholder="Pesquisar clube ou tema..."
              className="w-full rounded-lg border border-slate-500 bg-white py-3 pl-10 pr-12 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-blue-700 [&::-webkit-search-cancel-button]:appearance-none"
            />

            {busca && (
              <button type="button" onClick={() =>
                 setBusca("")} aria-label="Limpar busca" className="absolute right-0 top-0 h-full w-11 rounded-r-lg text-xl hover:bg-slate-100">×
              </button>

            )}

          </div>

        </div>

        <div role="group" aria-label="Filtrar por categoria" className="mb-10 mt-12 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setCategoria("Todos")}
            aria-pressed={categoria === "Todos"}
            className="flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm hover:border-blue-700 aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white"
          >
            Todos
          </button>

          <button
            type="button"
            onClick={() => setCategoria("Tecnologia")}
            aria-pressed={categoria === "Tecnologia"}
            className="flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm hover:border-blue-700 aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white"
          >
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-blue-600" />

            Tecnologia
          </button>

          <button
            type="button"
            onClick={() => setCategoria("Arte e cultura")}
            aria-pressed={categoria === "Arte e cultura"}
            className="flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm hover:border-blue-700 aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white"
          >
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-purple-600" />

            Arte e cultura
          </button>

          <button
            type="button"
            onClick={() => setCategoria("Esportes")}
            aria-pressed={categoria === "Esportes"}
            className="flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm hover:border-blue-700 aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white"
          >
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-red-600" />

            Esportes
          </button>

          <button
            type="button"
            onClick={() => setCategoria("Mídia & Comunicação")}
            aria-pressed={categoria === "Mídia & Comunicação"}
            className="flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm hover:border-blue-700 aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white"
          >
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-yellow-600" />

            Mídia & Comunicação
          </button>

          <button
            type="button"
            onClick={() => setCategoria("Raciocínio")}
            aria-pressed={categoria === "Raciocínio"}
            className="flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm hover:border-blue-700 aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white"
          >
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-orange-600" />

            Raciocínio
          </button>

          <button
            type="button"
            onClick={() => setCategoria("Literatura")}
            aria-pressed={categoria === "Literatura"}
            className="flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm hover:border-blue-700 aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white"
          >
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-pink-600" />

            Literatura
          </button>

        </div>

        <p className="mb-5 text-center text-xs text-slate-500">
          Consulte os dias, horários e locais de cada clube. Informações não disponíveis estão indicadas como “A confirmar”.
        </p>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10">
          {filtrados.map(clube => (
            <div key={clube.id} className="flex flex-col overflow-hidden rounded-3xl border-2 border-blue-700 bg-white">
              <div className={"relative flex h-44 items-center justify-center sm:h-52 " + clube.cor}>
                <span aria-hidden="true" className="text-6xl">{clube.icone}</span>
                <img src={clube.imagem} alt="" loading="lazy" onError={event => {event.currentTarget.hidden = true;}} className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold"><span aria-hidden="true">{clube.icone} </span>{clube.nome}</h2>
                <div className="mt-3 space-y-3 text-sm">
                  <p><strong>Categoria:</strong> <span className={"rounded px-1.5 py-0.5 text-white " + clube.cor}>{clube.categoria}</span></p>
                  <p><strong>Líder:</strong> {clube.lider}</p>
                  <p><strong>Horário:</strong> {clube.dias} · {clube.horario}</p>
                  <p><strong>Local:</strong> {clube.local}</p>
                </div>
                <p className="mt-4 border-t border-slate-300 pt-4 text-sm leading-relaxed text-slate-700">{clube.descricao}</p>
                <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                  <Link to={`/clubes/${clube.id}/inscricao`} className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">Inscrever-me</Link>
                  <Link to={`/clubes/${clube.id}`} className="text-xs font-semibold text-blue-700 hover:underline">Ver detalhes</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p role="status" className="mt-6 text-center text-sm text-slate-600">
          {filtrados.length === 0 && "Nenhum clube encontrado. Tente outro tema ou categoria."}
        </p>

        <div className="mt-10 border-t border-slate-300 pt-6">
          <h2 className="text-lg font-bold text-blue-800">✚ Tem uma ideia de clube?</h2>

          <p className="mt-3 text-sm">Reúna seus colegas e prepare uma proposta para a Coordenação Pedagógica.</p>

          <div className="mt-5 flex justify-end">
            <Link to="/clubes/propor" className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-800">+ Propor Novo Clube</Link>

          </div>

        </div>

      </section>

      <footer className="bg-blue-950 p-2">
        <p className="text-center text-sm font-bold text-white">
          Escola Estadual Sanico Teles
        </p>

      </footer>

    </main>

  );

}
