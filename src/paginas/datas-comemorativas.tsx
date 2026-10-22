import Cabecalho from "../componentes/cabecalho";
import { useState } from "react";
import { datas } from "../dados/datas-comemorativas";

export default function DatasComemorativas() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  function mostrarDatas(mes: string) {
    const datasParaMostrar = [];

    for (const data of datas) {
      if (data.mes !== mes) {
        continue;
      }

      if (filtro !== "Todos") {
        if (data.categoria !== filtro) {
          continue;
        }

      }

      const texto = data.mes + " " + data.texto;
      const encontrouBusca = texto.toLowerCase().includes(busca.toLowerCase());

      if (encontrouBusca === false) {
        continue;
      }

      datasParaMostrar.push(
        <p key={data.texto}>
          {data.texto}
        </p>

      );

    }

    return datasParaMostrar;
  }

  const marco = mostrarDatas("Março");

  const abril = mostrarDatas("Abril");

  const maio = mostrarDatas("Maio");

  const junho = mostrarDatas("Junho");

  const julho = mostrarDatas("Julho");

  const agosto = mostrarDatas("Agosto");

  const setembro = mostrarDatas("Setembro");

  const outubro = mostrarDatas("Outubro");

  const novembro = mostrarDatas("Novembro");

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Cabecalho />

      <section className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8">
        <h1 className="mx-auto max-w-2xl text-center text-2xl font-bold leading-snug text-blue-700 sm:text-3xl">
          Calendário de Datas Comemorativas e Campanhas (2026)
        </h1>

        <p className="mt-6 text-center font-semibold text-slate-700">
          Fique por dentro de tudo o que acontece na nossa escola.
        </p>

        <div aria-label="Legenda das cores" className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs">
          <p className="flex items-center gap-1">
            <span aria-hidden="true" className="h-4 w-4 rounded-full bg-red-600" />

            Nacionais & Saúde
          </p>

          <p className="flex items-center gap-1">
            <span aria-hidden="true" className="h-4 w-4 rounded-full bg-blue-600" />

            Cidadania & Inclusão
          </p>

          <p className="flex items-center gap-1">
            <span aria-hidden="true" className="h-4 w-4 rounded-full bg-green-700" />

            Sustentabilidade
          </p>

          <p className="flex items-center gap-1">
            <span aria-hidden="true" className="h-4 w-4 rounded-full bg-amber-500" />

            Acadêmicas
          </p>

        </div>

        <div role="group" aria-label="Filtrar datas" className="mt-8 flex flex-wrap justify-center gap-3">
          {["Todos", "Acadêmico", "Datas Cívicas", "Conscientização"].map((opcao) => (
            <button
              key={opcao}
              type="button"
              onClick={() => setFiltro(opcao)}
              aria-pressed={filtro === opcao}
              className="rounded border border-slate-300 bg-white px-3 py-1 text-xs hover:border-blue-700 aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white"
            >
              {opcao}
            </button>

          ))}

        </div>

        <div className="relative mx-auto mb-10 mt-12 max-w-md">
          <label htmlFor="busca-datas" className="sr-only">
            Procure por data ou tema
          </label>

          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-3 top-3 h-5 w-5">
            <circle cx="10" cy="10" r="6" />

            <path d="m15 15 5 5" />

          </svg>

          <input
            id="busca-datas"
            type="search"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Procure por data ou tema"
            className="w-full rounded-lg border border-slate-500 bg-white py-3 pl-10 pr-12 text-sm focus:outline-2 focus:outline-offset-2 focus:outline-blue-700 [&::-webkit-search-cancel-button]:appearance-none"
          />

          {busca && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => setBusca("")}
              className="absolute right-0 top-0 h-full w-11 rounded-r-lg text-xl hover:bg-slate-100"
            >
              ×
            </button>

          )}

        </div>

        <div className="grid items-stretch gap-5 sm:grid-cols-2">
          {marco.length > 0 && (
            <div className="border-[6px] border-slate-200 bg-white">
              <h2 className="bg-red-600 py-2 text-center text-xl font-bold text-white">
                Março
              </h2>

              <div className="space-y-3 p-4 text-xs leading-relaxed sm:text-sm">
                {marco}

              </div>

            </div>

          )}

          {abril.length > 0 && (
            <div className="border-[6px] border-slate-200 bg-white">
              <h2 className="bg-blue-600 py-2 text-center text-xl font-bold text-white">
                Abril
              </h2>

              <div className="space-y-3 p-4 text-xs leading-relaxed sm:text-sm">
                {abril}

              </div>

            </div>

          )}

          {maio.length > 0 && (
            <div className="border-[6px] border-slate-200 bg-white">
              <h2 className="bg-amber-500 py-2 text-center text-xl font-bold text-white">
                Maio
              </h2>

              <div className="space-y-3 p-4 text-xs leading-relaxed sm:text-sm">
                {maio}

              </div>

            </div>

          )}

          {(junho.length > 0 || julho.length > 0) && (
            <div className="border-[6px] border-slate-200 bg-white">
              {junho.length > 0 && (
                <div>
                  <h2 className="bg-red-600 py-2 text-center text-xl font-bold text-white">
                    Junho
                  </h2>

                  <div className="space-y-3 p-4 text-xs leading-relaxed sm:text-sm">
                    {junho}

                  </div>

                </div>

              )}

              {julho.length > 0 && (
                <div>
                  <h2 className="bg-green-700 py-2 text-center text-xl font-bold text-white">
                    Julho
                  </h2>

                  <div className="space-y-3 p-4 text-xs leading-relaxed sm:text-sm">
                    {julho}

                  </div>

                </div>

              )}

            </div>

          )}

          {agosto.length > 0 && (
            <div className="border-[6px] border-slate-200 bg-white">
              <h2 className="bg-amber-500 py-2 text-center text-xl font-bold text-white">
                Agosto
              </h2>

              <div className="space-y-3 p-4 text-xs leading-relaxed sm:text-sm">
                {agosto}

              </div>

            </div>

          )}

          {setembro.length > 0 && (
            <div className="border-[6px] border-slate-200 bg-white">
              <h2 className="bg-blue-600 py-2 text-center text-xl font-bold text-white">
                Setembro
              </h2>

              <div className="space-y-3 p-4 text-xs leading-relaxed sm:text-sm">
                {setembro}

              </div>

            </div>

          )}

          {outubro.length > 0 && (
            <div className="border-[6px] border-slate-200 bg-white">
              <h2 className="bg-red-600 py-2 text-center text-xl font-bold text-white">
                Outubro
              </h2>

              <div className="space-y-3 p-4 text-xs leading-relaxed sm:text-sm">
                {outubro}

              </div>

            </div>

          )}

          {novembro.length > 0 && (
            <div className="border-[6px] border-slate-200 bg-white">
              <h2 className="bg-emerald-700 py-2 text-center text-xl font-bold text-white">
                Novembro
              </h2>

              <div className="space-y-3 p-4 text-xs leading-relaxed sm:text-sm">
                {novembro}

              </div>

            </div>

          )}

        </div>

        <p role="status" className="mt-6 text-center text-sm text-slate-600">
          {marco.length + abril.length + maio.length + junho.length + julho.length + agosto.length + setembro.length + outubro.length + novembro.length === 0 && (
            "Nenhuma data encontrada. Tente outro tema ou filtro."
          )}
        </p>

      </section>

      <footer className="bg-blue-950 p-2 text-center text-sm font-bold text-white">
        Escola Estadual Sanico Teles
      </footer>

    </main>

  );

}
