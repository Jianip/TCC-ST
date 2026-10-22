import Cabecalho from "../componentes/cabecalho";
import { useState } from "react";
import { Link } from "react-router-dom";
import { grades } from "../dados/horarios";


function carregarTurma() {
  const turmaSalva = localStorage.getItem("turma-horarios");

  for (const grade of grades) {
    if (grade.turma === turmaSalva) {
      return grade.turma;
    }
  }

  return grades[0].turma;
}

export default function Horarios() {
  const [turma, setTurma] = useState(carregarTurma);
  const tecnico = turma.includes("Técnico");

  let modalidade = "Regular";
  let horarioSaida = "13h05";

  if (tecnico) {
    modalidade = "Técnico";
    horarioSaida = "15h50";
  }

  function selecionarTurma(novaTurma: string) {
    setTurma(novaTurma);
    localStorage.setItem("turma-horarios", novaTurma);
  }

  
  let grade = grades[0];
  for (const item of grades) {
    if (item.turma === turma) {
      grade = item;
    }
  }

 
  function mostrarAulas(numero: number) {
    return grade.aulas[numero].map((aula, dia) => (

      <td key={dia} className="border-l border-slate-200 px-4 py-4 align-top">

        <p className="font-semibold text-blue-700">{aula.disciplina}</p>

      </td>
    ));
  }

  return (

    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <Cabecalho />

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-8 sm:py-10">

        <Link to="/" className="text-sm font-semibold text-blue-700 hover:underline md:hidden">
          ← Início

        </Link>

        <p className="mt-4 text-sm font-bold tracking-widest text-blue-600">PORTAL DO ALUNO</p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Horários Escolares</h1>

        <p className="mt-3 text-slate-600">Selecione sua turma e consulte as aulas da semana.</p>

        <div className="mt-8 flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">

          <div>

            <label htmlFor="turma" className="mb-2 block text-sm font-bold">Turma</label>

            <select
              id="turma"
              value={grade.turma}
              onChange={(evento) => selecionarTurma(evento.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 sm:w-52"
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

          <dl aria-live="polite" className="flex flex-wrap gap-x-8 gap-y-4 text-sm">

            <div>

              <dt className="text-slate-500">Modalidade</dt>

              <dd className="mt-1 font-bold">{modalidade}</dd>

            </div>

            <div>

              <dt className="text-slate-500">Entrada</dt>

              <dd className="mt-1 font-bold">07h00</dd>

            </div>

            <div>

              <dt className="text-slate-500">Saída</dt>

              <dd className="mt-1 font-bold">{horarioSaida}</dd>

            </div>

            <div>

              <dt className="text-slate-500">Duração da aula</dt>

              <dd className="mt-1 font-bold">50 minutos</dd>

            </div>

          </dl>

        </div>

        <p id="aviso-grade" className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">

          <strong>Grade demonstrativa:</strong> as disciplinas e sua distribuição são exemplos e precisam ser substituídos pelos dados oficiais da escola.

        </p>

        <p id="ajuda-grade" className="mt-6 text-sm text-slate-500 sm:hidden">Deslize a tabela para consultar todos os dias.</p>

        <div
          role="region"
          aria-label="Grade semanal"
          tabIndex={0}
          className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-2 focus:outline-blue-600"
        >

          <table className="w-full min-w-[900px] border-collapse text-left text-sm" aria-describedby="aviso-grade">

            <caption className="border-b border-slate-200 p-5 text-left text-lg font-bold">
              Turma {turma} · Segunda a sexta

            </caption>

            <thead className="bg-slate-100">

              <tr>

                <th scope="col" className="w-36 px-4 py-4">Horário</th>

                <th scope="col" className="px-4 py-4">Segunda-feira</th>

                <th scope="col" className="px-4 py-4">Terça-feira</th>

                <th scope="col" className="px-4 py-4">Quarta-feira</th>

                <th scope="col" className="px-4 py-4">Quinta-feira</th>

                <th scope="col" className="px-4 py-4">Sexta-feira</th>

              </tr>

            </thead>

            

            <tbody>

              <tr className="border-t border-slate-200">

                <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                  <span className="block">07:00 – 07:50</span>

                  <span className="mt-1 block text-xs font-normal text-slate-500">1ª aula</span>

                </th>

                {mostrarAulas(0)}

              </tr>

              <tr className="border-t border-slate-200">

                <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                  <span className="block">07:50 – 08:40</span>

                  <span className="mt-1 block text-xs font-normal text-slate-500">2ª aula</span>

                </th>

                {mostrarAulas(1)}

              </tr>

              <tr className="border-t border-slate-200">

                <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                  <span className="block">08:40 – 09:30</span>

                  <span className="mt-1 block text-xs font-normal text-slate-500">3ª aula</span>

                </th>

                {mostrarAulas(2)}

              </tr>

              <tr className="border-t border-slate-200">

                <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                  <span className="block">09:30 – 10:20</span>

                  <span className="mt-1 block text-xs font-normal text-slate-500">4ª aula</span>

                </th>

                {mostrarAulas(3)}

              </tr>

              <tr className="border-t border-slate-200">

                <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                  <span className="block">10:20 – 10:35</span>

                </th>

                <td colSpan={5} className="bg-slate-100 px-4 py-4 text-center font-semibold text-slate-600">Intervalo</td>

              </tr>

              <tr className="border-t border-slate-200">

                <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                  <span className="block">10:35 – 11:25</span>

                  <span className="mt-1 block text-xs font-normal text-slate-500">5ª aula</span>

                </th>

                {mostrarAulas(4)}

              </tr>

              <tr className="border-t border-slate-200">

                <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                  <span className="block">11:25 – 12:15</span>

                  <span className="mt-1 block text-xs font-normal text-slate-500">6ª aula</span>

                </th>

                {mostrarAulas(5)}

              </tr>

              <tr className="border-t border-slate-200">

                <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                  <span className="block">12:15 – 13:05</span>

                  <span className="mt-1 block text-xs font-normal text-slate-500">7ª aula</span>

                </th>

                {mostrarAulas(6)}

              </tr>

             

              {tecnico && (
                <>

                  <tr className="border-t border-slate-200">

                    <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                      <span className="block">13:05 – 14:10</span>

                    </th>

                    <td colSpan={5} className="bg-slate-100 px-4 py-4 text-center font-semibold text-slate-600">Intervalo para almoço</td>

                  </tr>

                  <tr className="border-t border-slate-200">

                    <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                      <span className="block">14:10 – 15:00</span>

                      <span className="mt-1 block text-xs font-normal text-slate-500">8ª aula</span>

                    </th>

                    {mostrarAulas(7)}

                  </tr>

                  <tr className="border-t border-slate-200">

                    <th scope="row" className="whitespace-nowrap bg-slate-50 px-4 py-4 font-semibold">

                      <span className="block">15:00 – 15:50</span>

                      <span className="mt-1 block text-xs font-normal text-slate-500">9ª aula</span>

                    </th>

                    {mostrarAulas(8)}

                  </tr>
                </>
              )}

            </tbody>

          </table>

        </div>

        <p className="mt-4 text-sm text-slate-600">
          Intervalo: 10h20 às 10h35.{tecnico && " Almoço: 13h05 às 14h10."}

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
