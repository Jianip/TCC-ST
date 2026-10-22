import Cabecalho from "../componentes/cabecalho";
import { Link, useParams } from "react-router-dom";

import { buscarClube } from "../dados/clubes";

export default function DetalhesClube() {
  const { clube } = useParams();
  const escolhido = buscarClube(clube ?? "");

  if (!escolhido) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <Cabecalho />
        <section className="p-10">
        <h1 className="text-2xl font-bold">Clube não encontrado</h1>
        <Link to="/clubes" className="mt-5 inline-block text-blue-700 underline">Voltar aos clubes</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Cabecalho />

      <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <p className="text-sm font-bold tracking-widest text-blue-700">CLUBES DA ESCOLA</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{escolhido.nome}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{escolhido.descricao}</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <figure>
            <img src={escolhido.imagem} alt={"Ilustração do " + escolhido.nome} onError={(evento) => { evento.currentTarget.src = "/imagens/logo-sanico.jpg"; }} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <figcaption className="mt-2 text-sm text-slate-500">Imagem ilustrativa do clube.</figcaption>
          </figure>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Horários e local</h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm text-slate-500">Líder</dt>
                <dd className="mt-1 font-semibold">{escolhido.lider}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Dias dos encontros</dt>
                <dd className="mt-1 font-semibold">{escolhido.dias}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Horário</dt>
                <dd className="mt-1 font-semibold">{escolhido.horario}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Local</dt>
                <dd className="mt-1 font-semibold">{escolhido.local}</dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-600">Consulte a coordenação para confirmar os encontros e as informações ainda não disponíveis.</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">Conheça as atividades</h2>
          <p className="mt-3 leading-7 text-slate-600">{escolhido.atividades}</p>
          <h2 id="participar" className="mt-6 text-xl font-bold">Quer participar?</h2>
          <p className="mt-3 leading-7 text-slate-600">Procure a coordenação da escola para saber sobre inscrições, vagas e materiais necessários.</p>
        </div>
      </section>

      <footer className="bg-blue-950 p-3 text-center text-sm font-bold text-white">Escola Estadual Sanico Teles</footer>
    </main>
  );
}
