import Cabecalho from "../componentes/cabecalho";
import { cardapio } from "../dados/cardapio";

export default function Cardapio() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Cabecalho />
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8 sm:py-10">
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-blue-600">ESCOLA ESTADUAL SANICO TELES</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Nosso Cardápio</h1>
          <p className="mt-2 font-semibold text-slate-700">02/11 a 06/11/2026</p>
          <p className="mt-2 text-slate-600">Refeições previstas para a semana.</p>
        </div>

        <div className="mt-8 space-y-10">
          {cardapio.map((grupo) => (
            <section key={grupo.modalidade}>
              <h2 className="mb-4 text-center text-xl font-bold text-blue-700">{grupo.modalidade}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grupo.refeicoes.map((item) => (
                  <article key={item.dia} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-bold text-blue-700">{item.dia}</h3>
                    <p className="mt-3 text-sm font-semibold text-slate-500">ALMOÇO</p>
                    <p className="text-slate-700">{item.almoco}</p>
                    {item.lanche && (
                      <>
                        <p className="mt-3 text-sm font-semibold text-slate-500">LANCHE</p>
                        <p className="text-slate-700">{item.lanche}</p>
                      </>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
