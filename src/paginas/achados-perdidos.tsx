import Cabecalho from "../componentes/cabecalho";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  categorias,
  carregarObjetos,
  salvarObjetos,
  filtrarObjetos,
  type Objeto,
} from "../dados/achados-perdidos";

export default function AchadosPerdidos() {
  const location = useLocation();
  const [dados, setDados] = useState(carregarObjetos);

  
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");

  const [mensagem, setMensagem] = useState(
    location.state?.objetoCadastrado ? "Objeto cadastrado com sucesso!" : ""
  );
  const [erro, setErro] = useState("");

  
  const locais: string[] = [];

  for (const objeto of dados.objetos) {
    if (!locais.includes(objeto.local)) {
      locais.push(objeto.local);
    }
  }

  locais.sort((a, b) => a.localeCompare(b, "pt-BR"));

  const objetosFiltrados = filtrarObjetos(dados.objetos, {
    busca,
    categoria,
    local,
    data,
    status,
  });

  function limparFiltros() {
    setBusca("");
    setCategoria("");
    setLocal("");
    setData("");
    setStatus("");
  }

  function formatarData(data: string) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function atualizarObjetos(objetos: Objeto[], mensagem: string) {
    try {
      salvarObjetos(objetos);
      setDados({ objetos, erro: "" });
      setErro("");
      setMensagem(mensagem);
      return true;
    } catch {
      setMensagem("");
      setErro("Não foi possível salvar. Verifique o armazenamento do navegador e tente novamente.");
      return false;
    }
  }

  function excluirObjeto(objeto: Objeto) {
    const objetosAtualizados: Objeto[] = [];
    let localAindaExiste = false;

    for (const item of dados.objetos) {
      if (item.id !== objeto.id) {
        objetosAtualizados.push(item);

        if (item.local === local) {
          localAindaExiste = true;
        }
      }
    }

    const salvou = atualizarObjetos(
      objetosAtualizados,
      `Objeto "${objeto.nome}" excluído com sucesso.`
    );

    if (salvou && local === objeto.local && !localAindaExiste) {
      setLocal("");
    }
  }

  function alterarStatus(objeto: Objeto) {
    const objetosAtualizados: Objeto[] = [];

    for (const item of dados.objetos) {
      if (item.id === objeto.id) {
       
        const objetoAtualizado = { ...item };
        objetoAtualizado.devolvido = !item.devolvido;
        objetosAtualizados.push(objetoAtualizado);
      } else {
        objetosAtualizados.push(item);
      }
    }

    let mensagem = "Objeto marcado como devolvido.";

    if (objeto.devolvido) {
      mensagem = "Objeto disponível novamente.";
    }

    atualizarObjetos(objetosAtualizados, mensagem);
  }

  return (

    <main className="flex min-h-screen flex-col bg-white text-[#172033]">

      <Cabecalho />

      <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:px-10">

        <h1 className="text-4xl font-bold">
          Achados e perdidos
        </h1>

        <p className="mt-3 text-slate-500">
          Encontre objetos perdidos na escola ou informe algo que você encontrou.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Os registros são salvos apenas neste navegador.
        </p>

        {mensagem && (

          <p
            role="status"
            className="mt-5 rounded-lg bg-green-50 p-3 text-green-800"
          >

            {mensagem}
          </p>
        )}

        {(erro || dados.erro) && (

          <p
            role="alert"
            className="mt-5 rounded-lg bg-red-50 p-3 text-red-800"
          >
            {erro || dados.erro}
          </p>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          <label className="text-sm font-semibold">
            Buscar objeto

            <input
              value={busca}
              onChange={event => setBusca(event.target.value)}
              type="search"
              placeholder="Nome ou descrição..."
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
            />

          </label>

          <label className="text-sm font-semibold">
            Categoria

            <select
              value={categoria}
              onChange={event => setCategoria(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
            >

              <option value="">
                Todas as categorias
              </option>

              {categorias.map(item => (
                <option key={item}>{item}</option>
              ))}

            </select>

          </label>

          <label className="text-sm font-semibold">
            Local

            <select
              value={local}
              onChange={event => setLocal(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
            >

              <option value="">
                Todos os locais
              </option>

              {locais.map(item => (
                <option key={item}>{item}</option>
              ))}

            </select>

          </label>

          <label className="text-sm font-semibold">
            Data em que foi encontrado

            <input
              value={data}
              onChange={event => setData(event.target.value)}
              type="date"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
            />

          </label>

          <label className="text-sm font-semibold">
            Situação

            <select
              value={status}
              onChange={event => setStatus(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
            >

              <option value="">
                Todas as situações
              </option>

              <option value="disponivel">
                Aguardando o dono
              </option>

              <option value="devolvido">
                Devolvido
              </option>

            </select>

          </label>

          <div className="flex flex-wrap items-end gap-3">

            <button
              type="button"
              onClick={limparFiltros}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100"
            >
              Limpar filtros
            </button>

            <Link
              to="/informar-objeto"
              className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800"
            >
              Encontrei um objeto!
            </Link>

          </div>

        </div>

        <h2 className="mb-5 mt-10 text-xl font-bold text-blue-800">
          Objetos encontrados
        </h2>

        <p
          role="status"
          className="mb-4 text-sm text-slate-500"
        >

          {objetosFiltrados.length} objeto(s) encontrado(s)
        </p>

        <div className="grid gap-5">

          {objetosFiltrados.length === 0 && (

            <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              Nenhum objeto encontrado. Ajuste os filtros ou cadastre um objeto.
            </p>
          )}

          {objetosFiltrados.map(objeto => (

            <article
              key={objeto.id}
              className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[1fr_180px]"
            >

              <div className="min-w-0 break-words">

                <div className="flex flex-wrap items-center gap-3">

                  <h3 className="text-lg font-bold text-blue-800">
                    {objeto.nome}
                  </h3>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${objeto.devolvido ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                    {objeto.devolvido ? "Devolvido" : "Aguardando o dono"}
                  </span>

                </div>

                <p className="mt-3">
                  <strong>Data:</strong> {formatarData(objeto.data)}
                </p>

                <p className="mt-2">
                  <strong>Categoria:</strong> {objeto.categoria}
                </p>

                <p className="mt-2">
                  <strong>Local:</strong> {objeto.local}
                </p>

                <p className="mt-2 whitespace-pre-wrap">
                  <strong>Descrição:</strong> {objeto.descricao}
                </p>

                {objeto.retirada && (

                  <p className="mt-2">
                    <strong>Onde retirar:</strong> {objeto.retirada}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-3">

                  <button
                    type="button"
                    disabled={Boolean(dados.erro)}
                    onClick={() => alterarStatus(objeto)}
                    className="rounded-lg border border-blue-700 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                  >
                    {objeto.devolvido ? "Marcar como disponível" : "Marcar como devolvido"}
                  </button>

                  <button
                    type="button"
                    disabled={Boolean(dados.erro)}
                    onClick={() => excluirObjeto(objeto)}
                    aria-label={`Excluir ${objeto.nome}`}
                    className="rounded-lg border border-red-700 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    Excluir item
                  </button>

                </div>

              </div>

              <div className="flex min-h-36 items-center justify-center overflow-hidden rounded-xl bg-slate-100">

                {objeto.foto ? (
                  <img
                    className="max-h-56 w-full object-contain"
                    src={objeto.foto}
                    alt={objeto.nome}
                  />
                ) : (
                  <span className="text-sm text-slate-500">
                    Sem foto
                  </span>
                )}

              </div>

            </article>
          ))}

        </div>

      </section>

      <footer className="bg-[#172e70] p-3 text-center text-xs text-white">

        <p>
          © 2026 Escola Estadual Sanico Teles · Portal Escolar
        </p>

        <p>
          Desenvolvido pelos alunos do Técnico em Informática
        </p>

      </footer>

    </main>
  );
}
