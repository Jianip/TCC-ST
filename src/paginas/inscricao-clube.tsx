import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import Cabecalho from "../componentes/cabecalho";
import { buscarClube } from "../dados/clubes";
import { pegarPerfil } from "../dados/perfil";

export default function InscricaoClube() {
  const { clube } = useParams();
  const escolhido = buscarClube(clube ?? "");
  const perfil = pegarPerfil();
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  function confirmarInscricao(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const formulario = new FormData(evento.currentTarget);
    const inscricao = {
      clube: clube,
      nome: formulario.get("nome"),
      email: formulario.get("email"),
      turma: formulario.get("turma"),
      experiencia: formulario.get("experiencia"),
      motivo: formulario.get("motivo"),
      disponibilidade: true,
    };

    try {
      localStorage.setItem("inscricao-clube-" + clube, JSON.stringify(inscricao));
      setErro("");
      setSucesso(true);
    } catch {
      setErro("Não foi possível salvar. Tente novamente.");
    }

  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Cabecalho />

      <section className="mx-auto w-full max-w-xl flex-1 px-4 py-10">
        {!escolhido && (
          <div>
            <h1 className="text-2xl font-bold">Clube não encontrado</h1>

            <Link to="/clubes" className="mt-4 inline-block text-blue-700 underline">Voltar aos clubes</Link>

          </div>
        )}

        {escolhido && !sucesso && (
          <form onSubmit={confirmarInscricao} className="space-y-5 border-4 border-slate-200 bg-white p-5 sm:p-7">
            <h1 className="text-2xl font-bold">Inscrição no Clube</h1>

            <div className="space-y-2 rounded-lg border border-slate-400 p-4 text-sm">
              <h2 className="text-lg font-bold">{escolhido.icone} {escolhido.nome}</h2>

              <p className="flex items-center gap-2"><span className={"h-3 w-3 rounded-full " + escolhido.cor} />{escolhido.categoria}</p>

              <p>{escolhido.dias} · {escolhido.horario} · {escolhido.local}</p>

              <p><strong>Líder:</strong> {escolhido.lider}</p>

            </div>

            <div className="space-y-4 border-y border-slate-300 py-5">
              <label className="block text-sm font-semibold">
                Nome completo
                <input name="nome" autoComplete="name" required defaultValue={perfil.nome === "Aluno" ? "" : perfil.nome} className="mt-1 block w-full rounded border border-slate-400 p-2 font-normal" />

              </label>

              <label className="block text-sm font-semibold">
                E-mail do aluno
                <input name="email" type="email" autoComplete="email" required defaultValue={perfil.email} className="mt-1 block w-full rounded border border-slate-400 p-2 font-normal" />

              </label>

              <label className="block text-sm font-semibold">
                Turma
                <input name="turma" required placeholder="Ex.: 2º Ano B" className="mt-1 block w-full rounded border border-slate-400 p-2 font-normal" />

              </label>

            </div>

            <fieldset className="space-y-2 text-sm">
              <legend className="mb-2 font-bold">Perguntas rápidas de apoio</legend>

              <label className="flex items-center gap-2">
                <input type="radio" name="experiencia" value="iniciante" required />
                Iniciante (nunca pratiquei)
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="experiencia" value="intermediario-avancado" required />
                Intermediário / Avançado
              </label>

            </fieldset>

            <label className="block text-sm font-semibold">
              Por que você quer participar deste clube?
              <textarea name="motivo" required rows={3} className="mt-2 block w-full rounded-lg border border-slate-400 p-2 font-normal" />

            </label>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1" />
              {escolhido.horario === "A confirmar"
                ? "Estou ciente de que os dias e horários serão confirmados pela escola."
                : "Confirmo que tenho disponibilidade no horário das reuniões (" + escolhido.dias + ", " + escolhido.horario + ")."}
            </label>

            <p className="text-xs text-slate-600">A inscrição será salva neste navegador. A confirmação com a escola deve ser feita na coordenação.</p>

            {erro && <p role="alert" className="text-sm text-red-700">{erro}</p>}

            <div className="flex flex-wrap justify-end gap-3">
              <Link to="/clubes" className="rounded-full border border-slate-400 px-4 py-2 text-xs font-bold uppercase">Cancelar</Link>

              <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800">Confirmar inscrição</button>

            </div>

          </form>
        )}

        {escolhido && sucesso && (
          <div role="status" className="space-y-4 border-4 border-slate-200 bg-white p-6">
            <h1 className="text-2xl font-bold">Mensagem de sucesso</h1>

            <p className="font-semibold">🎉 Inscrição salva com sucesso neste navegador!</p>

            <p className="text-sm">Procure a coordenação para confirmar sua participação no {escolhido.nome}. Não há envio automático de e-mail.</p>

            <Link to="/clubes" className="inline-block text-blue-700 underline">Voltar aos clubes</Link>

          </div>
        )}

      </section>

      <footer className="bg-blue-800 p-3 text-center text-sm font-bold text-white">© 2026 Escola Estadual Sanico Teles • Portal Escolar</footer>

    </main>
  );
}
