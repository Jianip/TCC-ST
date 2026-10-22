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

  const mostrarEsportes = mostrarClube(
    "Clube de Esportes Esportes Organização de campeonatos internos (futsal, vôlei e basquete) e treinos para os times representativos da escola.",
    "Esportes",
  );

  const mostrarTaekwondo = mostrarClube(
    "Clube de Taekwondo Esportes Prática de artes marciais focada em disciplina, defesa pessoal, autocontrole e condicionamento físico para alunos de todos os níveis.",
    "Esportes",
  );

  const mostrarCoral = mostrarClube(
    "Clube de Coral & Canto Arte e cultura Técnica vocal, percepção musical e ensaios de canto em grupo para apresentações nos eventos oficiais e datas comemorativas da escola.",
    "Arte e cultura",
  );

  const mostrarRadio = mostrarClube(
    "Clube de Rádio & Podcast Mídia & Comunicação Produção de podcasts, locução para os intervalos escolares, técnicas de edição de áudio e entrevistas com a comunidade escolar.",
    "Mídia & Comunicação",
  );

  const mostrarRobotica = mostrarClube(
    "Clube de Robótica Tecnologia Construção de protótipos, automação e introdução à programação de circuitos. Ideal para quem quer aprender a criar projetos do zero.",
    "Tecnologia",
  );

  const mostrarLeitura = mostrarClube(
    "Clube do Livro Literatura Leituras de obras contemporâneas, mangás, literatura clássica e debates sobre criação de roteiros e histórias.",
    "Literatura",
  );

  const mostrarTeatro = mostrarClube(
    "Clube de Teatro Arte e cultura Espaço para desenvolver a oratória, expressão corporal e atuar em peças escolares e oficinas de improviso.",
    "Arte e cultura",
  );

  const mostrarXadrez = mostrarClube(
    "Clube de Xadrez Raciocínio Treinos de aberturas, táticas de jogo e organização de torneios internos da escola para todos os níveis de conhecimento.",
    "Raciocínio",
  );

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Cabecalho />

      <section className="mx-auto w-full max-w-5xl flex-1 px-5 py-9 sm:px-10">
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

        <div className="grid gap-7 sm:grid-cols-2 sm:gap-10">
          {mostrarRobotica && (
            <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-blue-700 bg-white">
              <div className="relative flex h-44 items-center justify-center sm:h-52 bg-blue-600">
                <span aria-hidden="true" className="text-6xl">
                  🤖
                </span>

                <img
                  src="/imagens/robotica.jpeg"
                  alt=""
                  loading="lazy"
                  onLoad={(evento) => { evento.currentTarget.hidden = false; }}
                  onError={(erro) => { erro.currentTarget.hidden = true; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold">
                  <span aria-hidden="true">🤖 </span>Clube de Robótica
                </h2>

                <div className="mt-3 space-y-3 text-sm">
                  <p>
                    <strong>Categoria:</strong> <span className="rounded px-1.5 py-0.5 text-white bg-blue-600">Tecnologia</span>

                  </p>

                  <p>
                    <strong>Líder:</strong> Marcos Júnior
                  </p>

                  <p>
                    <strong>Horário:</strong> Quartas às 13h15
                  </p>

                  <p>
                    <strong>Local:</strong> Sala Maker
                  </p>

                </div>

                <p className="mt-4 border-t border-slate-300 pt-4 text-sm leading-relaxed text-slate-700">
                  Construção de protótipos, automação e introdução à programação de circuitos. Ideal para quem quer aprender a criar projetos do zero.
                </p>

                <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                  <Link to="/clubes/robotica#participar" className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">
                    Como participar
                  </Link>

                  <Link to="/clubes/robotica" className="text-xs font-semibold text-blue-700 hover:underline">
                    Ver detalhes
                  </Link>

                </div>

              </div>

            </div>

          )}

          {mostrarTeatro && (
            <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-blue-700 bg-white">
              <div className="relative flex h-44 items-center justify-center sm:h-52 bg-purple-600">
                <span aria-hidden="true" className="text-6xl">
                  🎭
                </span>

                <img
                  src="/imagens/teatro.jpeg"
                  alt=""
                  loading="lazy"
                  onLoad={(evento) => { evento.currentTarget.hidden = false; }}
                  onError={(erro) => { erro.currentTarget.hidden = true; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold">
                  <span aria-hidden="true">🎭 </span>Clube de Teatro
                </h2>

                <div className="mt-3 space-y-3 text-sm">
                  <p>
                    <strong>Categoria:</strong> <span className="rounded px-1.5 py-0.5 text-white bg-purple-600">Arte e cultura</span>

                  </p>

                  <p>
                    <strong>Líder:</strong> Thales
                  </p>

                  <p>
                    <strong>Horário:</strong> Terças às 13h30
                  </p>

                  <p>
                    <strong>Local:</strong> Auditório
                  </p>

                </div>

                <p className="mt-4 border-t border-slate-300 pt-4 text-sm leading-relaxed text-slate-700">
                  Espaço para desenvolver a oratória, expressão corporal e atuar em peças escolares e oficinas de improviso.
                </p>

                <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                  <Link to="/clubes/teatro#participar" className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">
                    Como participar
                  </Link>

                  <Link to="/clubes/teatro" className="text-xs font-semibold text-blue-700 hover:underline">
                    Ver detalhes
                  </Link>

                </div>

              </div>

            </div>

          )}

          {mostrarXadrez && (
            <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-blue-700 bg-white">
              <div className="relative flex h-44 items-center justify-center sm:h-52 bg-blue-600">
                <span aria-hidden="true" className="text-6xl">
                  ♟️
                </span>

                <img
                  src="/imagens/xadrez.jpeg"
                  alt=""
                  loading="lazy"
                  onLoad={(evento) => { evento.currentTarget.hidden = false; }}
                  onError={(erro) => { erro.currentTarget.hidden = true; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold">
                  <span aria-hidden="true">♟️ </span>Clube de Xadrez
                </h2>

                <div className="mt-3 space-y-3 text-sm">
                  <p>
                    <strong>Categoria:</strong> <span className="rounded px-1.5 py-0.5 text-white bg-orange-600">Raciocínio</span>

                  </p>

                  <p>
                    <strong>Líder:</strong> Samuel
                  </p>

                  <p>
                    <strong>Horário:</strong> Quintas às 13h30
                  </p>

                  <p>
                    <strong>Local:</strong> Biblioteca
                  </p>

                </div>

                <p className="mt-4 border-t border-slate-300 pt-4 text-sm leading-relaxed text-slate-700">
                  Treinos de aberturas, táticas de jogo e organização de torneios internos da escola para todos os níveis de conhecimento.
                </p>

                <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                  <Link to="/clubes/xadrez#participar" className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">
                    Como participar
                  </Link>

                  <Link to="/clubes/xadrez" className="text-xs font-semibold text-blue-700 hover:underline">
                    Ver detalhes
                  </Link>

                </div>

              </div>

            </div>

          )}

          {mostrarLeitura && (
            <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-blue-700 bg-white">
              <div className="relative flex h-44 items-center justify-center sm:h-52 bg-pink-600">
                <span aria-hidden="true" className="text-6xl">
                  📚
                </span>

                <img
                  src="/imagens/leitura.jpeg"
                  alt=""
                  loading="lazy"
                  onLoad={(evento) => { evento.currentTarget.hidden = false; }}
                  onError={(erro) => { erro.currentTarget.hidden = true; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold">
                  <span aria-hidden="true">📚 </span>Clube do Livro
                </h2>

                <div className="mt-3 space-y-3 text-sm">
                  <p>
                    <strong>Categoria:</strong> <span className="rounded px-1.5 py-0.5 text-white bg-pink-600">Literatura</span>

                  </p>

                  <p>
                    <strong>Líder:</strong> Letícia
                  </p>

                  <p>
                    <strong>Horário:</strong> Sextas às 13h20
                  </p>

                  <p>
                    <strong>Local:</strong> Espaço de Leitura
                  </p>

                </div>

                <p className="mt-4 border-t border-slate-300 pt-4 text-sm leading-relaxed text-slate-700">
                  Leituras de obras contemporâneas, mangás, literatura clássica e debates sobre criação de roteiros e histórias.
                </p>

                <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                  <Link to="/clubes/leitura#participar" className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">
                    Como participar
                  </Link>

                  <Link to="/clubes/leitura" className="text-xs font-semibold text-blue-700 hover:underline">
                    Ver detalhes
                  </Link>

                </div>

              </div>

            </div>

          )}

          {mostrarEsportes && (
            <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-blue-700 bg-white">
              <div className="relative flex h-44 items-center justify-center sm:h-52 bg-red-600">
                <span aria-hidden="true" className="text-6xl">
                  ⚽
                </span>

                <img
                  src="/imagens/esporte.jpeg"
                  alt=""
                  loading="lazy"
                  onLoad={(evento) => { evento.currentTarget.hidden = false; }}
                  onError={(erro) => { erro.currentTarget.hidden = true; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold">
                  <span aria-hidden="true">⚽ </span>Clube de Esportes
                </h2>

                <div className="mt-3 space-y-3 text-sm">
                  <p>
                    <strong>Categoria:</strong> <span className="rounded px-1.5 py-0.5 text-white bg-red-600">Esportes</span>

                  </p>

                  <p>
                    <strong>Líder:</strong> Emillin
                  </p>

                  <p>
                    <strong>Horário:</strong> Segunda, quarta e sexta às 13h15
                  </p>

                  <p>
                    <strong>Local:</strong> Quadra Poliesportiva
                  </p>

                </div>

                <p className="mt-4 border-t border-slate-300 pt-4 text-sm leading-relaxed text-slate-700">
                  Organização de campeonatos internos (futsal, vôlei e basquete) e treinos para os times representativos da escola.
                </p>

                <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                  <Link to="/clubes/esportes#participar" className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">
                    Como participar
                  </Link>

                  <Link to="/clubes/esportes" className="text-xs font-semibold text-blue-700 hover:underline">
                    Ver detalhes
                  </Link>

                </div>

              </div>

            </div>

          )}

          {mostrarTaekwondo && (
            <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-blue-700 bg-white">
              <div className="relative flex h-44 items-center justify-center sm:h-52 bg-red-600">
                <span aria-hidden="true" className="text-6xl">
                  🥋
                </span>

                <img
                  src="/imagens/taekondow.jpeg"
                  alt=""
                  loading="lazy"
                  onLoad={(evento) => { evento.currentTarget.hidden = false; }}
                  onError={(erro) => { erro.currentTarget.hidden = true; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold">
                  <span aria-hidden="true">🥋 </span>Clube de Taekwondo
                </h2>

                <div className="mt-3 space-y-3 text-sm">
                  <p>
                    <strong>Categoria:</strong> <span className="rounded px-1.5 py-0.5 text-white bg-red-600">Esportes</span>

                  </p>

                  <p>
                    <strong>Líder:</strong> Anderson Carolino Mendes
                  </p>

                  <p>
                    <strong>Horário:</strong> Terça e quinta às 16h00
                  </p>

                  <p>
                    <strong>Local:</strong> Quadra Poliesportiva
                  </p>

                </div>

                <p className="mt-4 border-t border-slate-300 pt-4 text-sm leading-relaxed text-slate-700">
                  Prática de artes marciais focada em disciplina, defesa pessoal, autocontrole e condicionamento físico para alunos de todos os níveis.
                </p>

                <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                  <Link to="/clubes/taekwondo#participar" className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">
                    Como participar
                  </Link>

                  <Link to="/clubes/taekwondo" className="text-xs font-semibold text-blue-700 hover:underline">
                    Ver detalhes
                  </Link>

                </div>

              </div>

            </div>

          )}

          {mostrarCoral && (
            <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-blue-700 bg-white">
              <div className="relative flex h-44 items-center justify-center sm:h-52 bg-purple-600">
                <span aria-hidden="true" className="text-6xl">
                  🎤
                </span>

                <img
                  src="/imagens/coral.jpeg"
                  alt=""
                  loading="lazy"
                  onLoad={(evento) => { evento.currentTarget.hidden = false; }}
                  onError={(erro) => { erro.currentTarget.hidden = true; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold">
                  <span aria-hidden="true">🎤 </span>Clube de Coral & Canto
                </h2>

                <div className="mt-3 space-y-3 text-sm">
                  <p>
                    <strong>Categoria:</strong> <span className="rounded px-1.5 py-0.5 text-white bg-purple-600">Arte e cultura</span>

                  </p>

                  <p>
                    <strong>Líder:</strong> Leandro Morais
                  </p>

                  <p>
                    <strong>Horário:</strong> A confirmar
                  </p>

                  <p>
                    <strong>Local:</strong> Auditório / Sala 19
                  </p>

                </div>

                <p className="mt-4 border-t border-slate-300 pt-4 text-sm leading-relaxed text-slate-700">
                  Técnica vocal, percepção musical e ensaios de canto em grupo para apresentações nos eventos oficiais e datas comemorativas da escola.
                </p>

                <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                  <Link to="/clubes/coral-canto#participar" className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">
                    Como participar
                  </Link>

                  <Link to="/clubes/coral-canto" className="text-xs font-semibold text-blue-700 hover:underline">
                    Ver detalhes
                  </Link>

                </div>

              </div>

            </div>

          )}

          {mostrarRadio && (
            <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-blue-700 bg-white">
              <div className="relative flex h-44 items-center justify-center sm:h-52 bg-yellow-600">
                <span aria-hidden="true" className="text-6xl">
                  📻
                </span>

                <img
                  src="/imagens/podcast.jpeg"
                  alt=""
                  loading="lazy"
                  onLoad={(evento) => { evento.currentTarget.hidden = false; }}
                  onError={(erro) => { erro.currentTarget.hidden = true; }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold">
                  <span aria-hidden="true">📻 </span>Clube de Rádio & Podcast
                </h2>

                <div className="mt-3 space-y-3 text-sm">
                  <p>
                    <strong>Categoria:</strong> <span className="rounded px-1.5 py-0.5 text-white bg-yellow-600">Mídia & Comunicação</span>

                  </p>

                  <p>
                    <strong>Líder:</strong> Wanderley e Anderson Baptista
                  </p>

                  <p>
                    <strong>Horário:</strong> Terça e quinta às 16h00
                  </p>

                  <p>
                    <strong>Local:</strong> Sala da Rádio
                  </p>

                </div>

                <p className="mt-4 border-t border-slate-300 pt-4 text-sm leading-relaxed text-slate-700">
                  Produção de podcasts, locução para os intervalos escolares, técnicas de edição de áudio e entrevistas com a comunidade escolar.
                </p>

                <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                  <Link to="/clubes/radio-podcast#participar" className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">
                    Como participar
                  </Link>

                  <Link to="/clubes/radio-podcast" className="text-xs font-semibold text-blue-700 hover:underline">
                    Ver detalhes
                  </Link>

                </div>

              </div>

            </div>

          )}

        </div>

        <p role="status" className="mt-6 text-center text-sm text-slate-600">
          {!mostrarEsportes && !mostrarTaekwondo && !mostrarCoral && !mostrarRadio && !mostrarRobotica && !mostrarLeitura && !mostrarTeatro && !mostrarXadrez && "Nenhum clube encontrado. Tente outro tema ou categoria."}
        </p>

      </section>

      <footer className="bg-blue-950 p-2">
        <p className="text-center text-sm font-bold text-white">
          Escola Estadual Sanico Teles
        </p>

      </footer>

    </main>

  );

}
