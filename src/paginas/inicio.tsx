import Cabecalho from "../componentes/cabecalho";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePerfil } from "../servicos/portal";
import { usePortal } from "../servicos/portal";
import { lerPreferencia, salvarPreferencia } from "../servicos/api";


export default function Inicio() {
  const perfil = usePerfil();
  const { catalogo: { grades } } = usePortal();
  const [turma, setTurma] = useState(() => grades.find(g => g.turma === lerPreferencia("turma-horarios"))?.turma ?? grades[0].turma);

  function selecionarTurma(novaTurma: string) {
    setTurma(novaTurma);
    salvarPreferencia("turma-horarios", novaTurma);
  }

  
  let grade = grades[0];

  for (const item of grades) {
    if (item.turma === turma) {
      grade = item;
    }
  }

  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1).getDay();
  const totalDias = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
  const dias = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
  ];

  const horarios = [
    "07:00 – 07:50",
    "07:50 – 08:40",
    "08:40 – 09:30",
  ];

  
  const dia = new Date().getDay();
  let coluna = dia - 1;
  let tituloDia = "";

  if (dia === 0 || dia === 6) {
    coluna = 0;
    tituloDia = "Próxima segunda-feira";
  } else {
    tituloDia = "Hoje · " + dias[coluna];
  }

  return (

    <main className="flex min-h-screen flex-col bg-white text-slate-900">

      <Cabecalho />

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12 sm:px-10">

        <div className="flex items-center justify-between gap-8">

          <div>

            <h1 className="text-xl font-bold text-black sm:text-4xl">
              Bom te ver por aqui, {perfil.nome}!
            </h1>

            <p className="mt-2 text-sm sm:text-base">
              Confira seus horários, recados e tarefas do dia para manter tudo
              sob controle.
            </p>

          </div>

          <img
            src="/imagens/logo-sanico.jpg"
            alt="Logo da Escola Estadual Sanico Teles"
            className="hidden h-36 w-40 shrink-0 rounded-lg object-contain sm:block"
          />

        </div>


        <div className="grid items-stretch gap-8 md:grid-cols-2">

          <div className="flex min-w-0 flex-col">

            <h2 className="mb-3 text-xl font-bold text-blue-700 ">
              Agenda Escolar
            </h2>

            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">

              <div className="border-b border-slate-200 px-3 py-2.5 text-center font-bold text-blue-700">
                {hoje.toLocaleDateString("pt-BR", {month: "long", year: "numeric"})}

              </div>

              <div className="grid grid-cols-7 border-b border-slate-200 text-center text-[10px] font-bold text-slate-500 sm:text-xs">

                <div className="py-2">DOM</div>

                <div className="py-2">SEG</div>

                <div className="py-2">TER</div>

                <div className="py-2">QUA</div>

                <div className="py-2">QUI</div>

                <div className="py-2">SEX</div>

                <div className="py-2">SÁB</div>

              </div>

              <div className="grid flex-1 auto-rows-fr grid-cols-7 [&>div]:flex [&>div]:min-h-9 [&>div]:items-center [&>div]:justify-center [&>div]:border-b [&>div]:border-r [&>div]:border-slate-100 [&>div]:text-xs">

                {Array.from({length: Math.ceil((primeiroDia + totalDias) / 7) * 7}, (_, index) => {
                  const dia = index - primeiroDia + 1;
                  return <div key={index} className={dia === hoje.getDate() ? "bg-blue-100 font-bold" : ""}>{dia > 0 && dia <= totalDias ? dia : ""}</div>;
                })}

              </div>

            </div>

            <Link
              to="/agenda"
              className="mt-3 block rounded-lg bg-blue-600 px-4 py-2 text-center text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Ver agenda completa →
            </Link>

          </div>

          <div className="flex min-w-0 flex-col">

            <h2 className="mb-3 text-xl font-bold text-blue-700">Horários Escolares</h2>

            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">

              <div className="border-b border-slate-200 p-3">

                <label htmlFor="turma-inicio" className="mr-3 text-sm font-bold">Turma</label>

                <select
                  id="turma-inicio"
                  value={grade.turma}
                  onChange={(evento) => selecionarTurma(evento.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                >

                  <option value="1.1">1.1</option>

                  <option value="1 Técnico">1 Técnico</option>

                  <option value="1.2">1.2</option>

                  <option value="2.1">2.1</option>

                  <option value="2 Técnico">2 Técnico</option>

                  <option value="3.1">3.1</option>

                  <option value="3 Técnico">3 Técnico</option>

                  <option value="3.2">3.2</option>

                </select>

              </div>

              <table className="w-full text-left text-sm">

                <caption className="px-3 py-2 text-left font-bold text-blue-700">
                  {tituloDia}

                  <span className="mt-1 block text-xs font-normal text-slate-500">Primeiras três aulas</span>
                </caption>

                <thead className="bg-slate-50 text-xs text-slate-600">

                  <tr>

                    <th scope="col" className="px-3 py-2">Horário</th>

                    <th scope="col" className="px-3 py-2">Disciplina e professor</th>

                  </tr>

                </thead>

                <tbody>

                  {horarios.map((horario, numero) => (

                    <tr key={horario} className="border-t border-slate-100">

                      <th scope="row" className="whitespace-nowrap px-3 py-3 text-xs font-semibold">{horario}</th>

                      <td className="px-3 py-3">

                        <p className="font-semibold">{grade.aulas[numero][coluna].disciplina}</p>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

              <p className="border-t border-slate-200 px-3 py-2 text-xs text-slate-500">Grade demonstrativa, aguardando dados oficiais.</p>

            </div>

            <Link to="/horarios" className="mt-3 block rounded-lg bg-blue-600 px-4 py-2 text-center text-xs font-bold text-white shadow-sm hover:bg-blue-700">
              Ver horários completos →
            </Link>

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
