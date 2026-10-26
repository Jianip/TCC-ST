import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Cabecalho from "../componentes/cabecalho";

export default function ProporClube() {
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  function salvarProposta(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const formulario = new FormData(evento.currentTarget);
    const proposta = {
      nome: formulario.get("nome"),
      lider: formulario.get("lider"),
      local: formulario.get("local"),
      horario: formulario.get("horario"),
      categoria: formulario.get("categoria"),
      atividades: formulario.get("atividades"),
      objetivo: formulario.get("objetivo"),
    };

    try {
      localStorage.setItem("proposta-clube-" + Date.now(), JSON.stringify(proposta));
      setErro("");
      setSucesso(true);
    } catch {
      setErro("Não foi possível salvar a proposta. Tente novamente.");
    }

  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Cabecalho />

      <section className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        {!sucesso && (
          <form onSubmit={salvarProposta} className="space-y-6 border-4 border-slate-200 bg-white p-5 sm:p-8">
            <h1 className="text-2xl font-bold">Propor um Novo Clube</h1>

            <p className="text-sm">Preencha os campos para preparar sua proposta para a Coordenação Pedagógica.</p>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Nome do clube
                <input name="nome" required className="mt-2 block w-full rounded-lg border border-slate-400 p-2 font-normal" />

              </label>

              <label className="block text-sm font-semibold">
                Líder do clube
                <input name="lider" required className="mt-2 block w-full rounded-lg border border-slate-400 p-2 font-normal" />

              </label>

              <label className="block text-sm font-semibold">
                Local pretendido
                <input name="local" required className="mt-2 block w-full rounded-lg border border-slate-400 p-2 font-normal" />

              </label>

              <label className="block text-sm font-semibold">
                Sugestão de horário e dia
                <input name="horario" required className="mt-2 block w-full rounded-lg border border-slate-400 p-2 font-normal" />

              </label>

            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold">Categoria</legend>

              <div className="flex flex-wrap gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm">
                  <input type="radio" name="categoria" value="Tecnologia" required />
                  <span className="h-3 w-3 rounded-full bg-blue-600" aria-hidden="true" />
                  Tecnologia
                </label>

                <label className="flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm">
                  <input type="radio" name="categoria" value="Literatura" required />
                  <span className="h-3 w-3 rounded-full bg-pink-600" aria-hidden="true" />
                  Literatura
                </label>

                <label className="flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm">
                  <input type="radio" name="categoria" value="Esporte" required />
                  <span className="h-3 w-3 rounded-full bg-red-600" aria-hidden="true" />
                  Esporte
                </label>

                <label className="flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm">
                  <input type="radio" name="categoria" value="Raciocínio" required />
                  <span className="h-3 w-3 rounded-full bg-orange-600" aria-hidden="true" />
                  Raciocínio
                </label>

                <label className="flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm">
                  <input type="radio" name="categoria" value="Arte & Cultura & Música" required />
                  <span className="h-3 w-3 rounded-full bg-purple-600" aria-hidden="true" />
                  Arte & Cultura & Música
                </label>

                <label className="flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm">
                  <input type="radio" name="categoria" value="Mídia" required />
                  <span className="h-3 w-3 rounded-full bg-yellow-600" aria-hidden="true" />
                  Mídia
                </label>

              </div>

            </fieldset>

            <div className="space-y-5 border-y border-slate-300 py-5">
              <label className="block text-sm font-semibold">
                Descrição curta das atividades
                <textarea name="atividades" required rows={3} className="mt-2 block w-full rounded-lg border border-slate-400 p-2 font-normal" />

              </label>

              <label className="block text-sm font-semibold">
                Objetivo pedagógico (o que os alunos vão aprender ou desenvolver)
                <textarea name="objetivo" required rows={3} className="mt-2 block w-full rounded-lg border border-slate-400 p-2 font-normal" />

              </label>

            </div>

            <div className="space-y-2 text-sm">
              <h2 className="font-bold">Como funciona após salvar?</h2>

              <p>A proposta ficará salva apenas neste navegador. Procure a Coordenação Pedagógica para apresentar sua ideia e confirmar espaço e horário.</p>

            </div>

            {erro && <p role="alert" className="text-sm text-red-700">{erro}</p>}

            <div className="flex flex-wrap justify-end gap-3">
              <Link to="/clubes" className="rounded-full border border-slate-400 px-4 py-2 text-xs font-bold uppercase">Cancelar</Link>

              <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">Salvar proposta</button>

            </div>

          </form>
        )}

        {sucesso && (
          <div role="status" className="space-y-4 border-4 border-slate-200 bg-white p-6">
            <h1 className="text-2xl font-bold">Proposta salva!</h1>

            <p>Sua ideia foi salva neste navegador. Para apresentar a proposta à escola, procure a Coordenação Pedagógica.</p>

            <Link to="/clubes" className="inline-block text-blue-700 underline">Voltar aos clubes</Link>

          </div>
        )}

      </section>

      <footer className="bg-blue-800 p-3 text-center text-sm font-bold text-white">© 2026 Escola Estadual Sanico Teles • Portal Escolar</footer>

    </main>
  );
}
