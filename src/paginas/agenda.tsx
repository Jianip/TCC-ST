import Cabecalho from "../componentes/cabecalho";
import { FormEvent, useState } from "react";


type Compromisso = {
  id: number;
  titulo: string;
  data: string;
  descricao: string;
  cor: string;
};

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function lerCompromissos() {
  const dados = localStorage.getItem("agenda-escolar");
  if (dados) {
    return JSON.parse(dados) as Compromisso[];
  }
  return [];
}

function dataParaInput(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return ano + "-" + mes + "-" + dia;
}

export default function Agenda() {


  const [mes, setMes] = useState(new Date());
  const [aberto, setAberto] = useState(false);


  const [compromissos, setCompromissos] = useState(lerCompromissos);


  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState(dataParaInput(mes));
  const [descricao, setDescricao] = useState("");
  const [cor, setCor] = useState("#bfdbfe");
  const [idEditando, setIdEditando] = useState<number | null>(null);

  const ano = mes.getFullYear();
  const numeroMes = mes.getMonth();
  const primeiroDia = new Date(ano, numeroMes, 1).getDay();
  const totalDias = new Date(ano, numeroMes + 1, 0).getDate();

  function mudarMes(numero: number) {
    setMes(new Date(ano, numeroMes + numero, 1));
  }

  function salvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const lista = [...compromissos];

    if (idEditando === null) {
    
      const novo = { id: Date.now(), titulo, data, descricao, cor };
      lista.push(novo);
    } else {
    
      for (let posicao = 0; posicao < lista.length; posicao++) {
        if (lista[posicao].id === idEditando) {
          lista[posicao] = { id: idEditando, titulo, data, descricao, cor };
        }
      }
    }

    setCompromissos(lista);
    localStorage.setItem("agenda-escolar", JSON.stringify(lista));

    irParaData(data);
    setTitulo("");
    setDescricao("");
    setIdEditando(null);
    setAberto(false);
  }

  function novoCompromisso() {
    setIdEditando(null);
    setTitulo("");
    setData(dataParaInput(mes));
    setDescricao("");
    setCor("#bfdbfe");
    setAberto(true);
  }

  function editar(item: Compromisso) {
    setIdEditando(item.id);
    setTitulo(item.titulo);
    setData(item.data);
    setDescricao(item.descricao);
    setCor(item.cor || "#bfdbfe");
    setAberto(true);
  }

  function excluir(id: number) {
    const lista = compromissos.filter((compromisso) => compromisso.id !== id);
    setCompromissos(lista);
    localStorage.setItem("agenda-escolar", JSON.stringify(lista));
  }

  function irParaData(dataEscolhida: string) {
    const partes = dataEscolhida.split("-");
    const anoEscolhido = Number(partes[0]);
    const mesEscolhido = Number(partes[1]);
    setMes(new Date(anoEscolhido, mesEscolhido - 1, 1));
  }

  function corDoTexto(corFundo: string) {
   
    const vermelho = parseInt(corFundo.slice(1, 3), 16);
    const verde = parseInt(corFundo.slice(3, 5), 16);
    const azul = parseInt(corFundo.slice(5, 7), 16);

    const brilho = vermelho * 0.299 + verde * 0.587 + azul * 0.114;

    if (brilho > 150) {
      return "#111827";
    }
    return "#ffffff";
  }

  function itensDoDia(dia: number) {
    const dataDoDia = dataParaInput(new Date(ano, numeroMes, dia));
    return compromissos.filter((compromisso) => compromisso.data === dataDoDia);
  }

  
  function mostrarLembretes(dia: number) {
    return itensDoDia(dia).map((item) => (
      <p
        key={item.id}
        title={item.titulo}
        style={{
          backgroundColor: item.cor || "#bfdbfe",
          color: corDoTexto(item.cor || "#bfdbfe"),
        }}
        className="mt-1 truncate rounded px-1 py-1 text-[10px] sm:text-xs"
      >
        {item.titulo}
      </p>
    ));
  }

  
  const listaOrdenada = [...compromissos];
  listaOrdenada.sort((primeiro, segundo) =>
    primeiro.data.localeCompare(segundo.data),
  );

 
  let tituloFormulario = "Novo compromisso";
  let textoBotao = "Salvar compromisso";

  if (idEditando !== null) {
    tituloFormulario = "Editar compromisso";
    textoBotao = "Salvar alterações";
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
     
      <Cabecalho />

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-7 sm:p-10">
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600">
          ORGANIZE-SE
        </p>
        <h1 className="mt-2 text-4xl font-bold">Minha agenda</h1>
        <p className="mt-2 text-slate-500">
          Adicione seus compromissos, tarefas e avaliações.
        </p>

        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <button
            onClick={novoCompromisso}
            className="w-fit rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            + Novo compromisso
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => mudarMes(-1)}
              className="h-11 w-11 rounded-xl border border-slate-200 bg-white text-2xl"
            >
              ‹
            </button>
            <p className="min-w-44 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center font-bold">
              {meses[numeroMes]} {ano}
            </p>
            <button
              onClick={() => mudarMes(1)}
              className="h-11 w-11 rounded-xl border border-slate-200 bg-white text-2xl"
            >
              ›
            </button>
          </div>
        </div>

        
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-7 border-b border-slate-200 text-center text-xs font-bold sm:text-sm">
              <div className="py-4">DOM</div>
              <div className="py-4">SEG</div>
              <div className="py-4">TER</div>
              <div className="py-4">QUA</div>
              <div className="py-4">QUI</div>
              <div className="py-4">SEX</div>
              <div className="py-4">SÁB</div>
            </div>
            
            <div className="grid grid-cols-7 [&>div]:min-h-20 [&>div]:border-b [&>div]:border-r [&>div]:border-slate-200 [&>div]:p-1 [&>div]:text-sm sm:[&>div]:min-h-28 sm:[&>div]:p-2">
              
              {primeiroDia > 0 && <div></div>}
              {primeiroDia > 1 && <div></div>}
              {primeiroDia > 2 && <div></div>}
              {primeiroDia > 3 && <div></div>}
              {primeiroDia > 4 && <div></div>}
              {primeiroDia > 5 && <div></div>}

              <div>
                1
                {mostrarLembretes(1)}
              </div>

              <div>
                2
                {mostrarLembretes(2)}
              </div>

              <div>
                3
                {mostrarLembretes(3)}
              </div>

              <div>
                4
                {mostrarLembretes(4)}
              </div>

              <div>
                5
                {mostrarLembretes(5)}
              </div>

              <div>
                6
                {mostrarLembretes(6)}
              </div>

              <div>
                7
                {mostrarLembretes(7)}
              </div>

              <div>
                8
                {mostrarLembretes(8)}
              </div>

              <div>
                9
                {mostrarLembretes(9)}
              </div>

              <div>
                10
                {mostrarLembretes(10)}
              </div>

              <div>
                11
                {mostrarLembretes(11)}
              </div>

              <div>
                12
                {mostrarLembretes(12)}
              </div>

              <div>
                13
                {mostrarLembretes(13)}
              </div>

              <div>
                14
                {mostrarLembretes(14)}
              </div>

              <div>
                15
                {mostrarLembretes(15)}
              </div>

              <div>
                16
                {mostrarLembretes(16)}
              </div>

              <div>
                17
                {mostrarLembretes(17)}
              </div>

              <div>
                18
                {mostrarLembretes(18)}
              </div>

              <div>
                19
                {mostrarLembretes(19)}
              </div>

              <div>
                20
                {mostrarLembretes(20)}
              </div>

              <div>
                21
                {mostrarLembretes(21)}
              </div>

              <div>
                22
                {mostrarLembretes(22)}
              </div>

              <div>
                23
                {mostrarLembretes(23)}
              </div>

              <div>
                24
                {mostrarLembretes(24)}
              </div>

              <div>
                25
                {mostrarLembretes(25)}
              </div>

              <div>
                26
                {mostrarLembretes(26)}
              </div>

              <div>
                27
                {mostrarLembretes(27)}
              </div>

              <div>
                28
                {mostrarLembretes(28)}
              </div>

              {totalDias >= 29 && (
                <div>
                  29
                  {mostrarLembretes(29)}
                </div>
              )}

              {totalDias >= 30 && (
                <div>
                  30
                  {mostrarLembretes(30)}
                </div>
              )}

              {totalDias >= 31 && (
                <div>
                  31
                  {mostrarLembretes(31)}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            
            <h2 className="text-xl font-bold">Meus compromissos</h2>
            
            <p className="mt-1 text-sm text-slate-500">
              Itens salvos na sua agenda
            </p>
            
            <div className="mt-5 grid gap-3">
              {listaOrdenada.length === 0 && (
                <p className="rounded-xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">
                  Nenhum compromisso cadastrado.
                </p>
              )}
              {listaOrdenada.map((item) => (
                <div
                  key={item.id}
                  style={{ borderLeft: `6px solid ${item.cor || "#bfdbfe"}` }}
                  className="rounded-xl bg-slate-50 p-3"
                >
                  <p className="font-bold">{item.titulo}</p>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={() => editar(item)}
                      className="text-sm text-blue-700 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluir(item.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </div>
                  <button
                    onClick={() => irParaData(item.data)}
                    title="Ver no calendário"
                    className="mt-1 text-sm text-blue-700 hover:underline"
                  >
                    {item.data.split("-").reverse().join("/")}
                  </button>
                  {item.descricao && (
                    <p className="mt-1 text-sm text-slate-500">
                      {item.descricao}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {aberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <form
              onSubmit={salvar}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{tituloFormulario}</h2>
                <button
                  type="button"
                  aria-label="Cancelar"
                  onClick={() => setAberto(false)}
                  className="text-xl"
                >
                  ×
                </button>
              </div>

              <label className="mt-5 block text-sm font-bold">Título</label>
              <input
                required
                value={titulo}
                onChange={(evento) => setTitulo(evento.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Ex.: Prova de matemática"
              />

              <label className="mt-4 block text-sm font-bold">Data</label>
              <input
                required
                type="date"
                value={data}
                onChange={(evento) => setData(evento.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              />

              <label className="mt-4 block text-sm font-bold">
                Descrição (opcional)
              </label>
              
              <textarea
                value={descricao}
                onChange={(evento) => setDescricao(evento.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Anote mais detalhes"
              />

              <label className="mt-4 block text-sm font-bold">
                Cor da marcação
              </label>

              <input
                type="color"
                value={cor}
                onChange={(evento) => setCor(evento.target.value)}
                className="mt-2 h-10 w-full cursor-pointer rounded border border-slate-300"
              />

              <button className="mt-5 w-full rounded-lg bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800">
                {textoBotao}
              </button>

            </form>

          </div>
        )}

      </section>

      <footer className="bg-blue-950 p-2 text-center text-sm font-bold text-white">
        Escola Estadual Sanico Teles
      </footer>
    </main>
  );
}
