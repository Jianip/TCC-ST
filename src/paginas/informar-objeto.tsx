import Cabecalho from "../componentes/cabecalho";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  carregarObjetos,
  salvarObjetos,
  categorias,
  hoje,
  dataValida,
} from "../dados/achados-perdidos";

export default function InformarObjeto() {
  const navegar = useNavigate();
  const [foto, setFoto] = useState("");
  const [erro, setErro] = useState("");
  const [erroFoto, setErroFoto] = useState("");
  const [lendoFoto, setLendoFoto] = useState(false);

  function selecionarFoto(evento: ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0];

    setFoto("");
    setErroFoto("");

    if (!arquivo) {
      return;
    }

    
    const formatosPermitidos = ["image/jpeg", "image/png", "image/webp"];
    const formatoValido = formatosPermitidos.includes(arquivo.type);
    const tamanhoMaximo = 2 * 1024 * 1024;

    if (!formatoValido || arquivo.size > tamanhoMaximo) {
      setErroFoto("Escolha uma imagem JPG, PNG ou WebP de até 2 MB.");
      evento.target.value = "";
      return;
    }

    setLendoFoto(true);

    
    const leitor = new FileReader();

    leitor.onload = () => {
      setFoto(String(leitor.result));
      setLendoFoto(false);
    };

    leitor.onerror = () => {
      setErroFoto("Não foi possível ler a foto. Selecione outra imagem.");
      setLendoFoto(false);
    };

    leitor.readAsDataURL(arquivo);
  }

  function removerFoto() {
    setFoto("");
    setErroFoto("");

    const campoFoto = document.getElementById("foto") as HTMLInputElement;
    campoFoto.value = "";
  }

  function cadastrar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (lendoFoto || erroFoto) {
      return;
    }

    
    const formulario = new FormData(evento.currentTarget);

    function lerCampo(nome: string) {
      const valor = formulario.get(nome);
      return String(valor ?? "").trim();
    }

    const nome = lerCampo("objeto");
    const categoria = lerCampo("categoria");
    const local = lerCampo("local");
    const data = lerCampo("data");
    const descricao = lerCampo("descricao");
    const retirada = lerCampo("retirada");

    const camposVazios = !nome || !local || !descricao || !retirada;
    const categoriaValida = categorias.includes(categoria);
    const dataInvalida = !dataValida(data) || data > hoje();

    if (camposVazios || !categoriaValida || dataInvalida) {
      setErro("Preencha todos os campos obrigatórios e informe uma data válida que não esteja no futuro.");
      return;
    }

    const dados = carregarObjetos();

    if (dados.erro) {
      setErro(dados.erro);
      return;
    }

    try {
      const novoObjeto = {
        id: crypto.randomUUID(),
        nome,
        categoria,
        local,
        data,
        descricao,
        retirada,
        foto,
        devolvido: false,
      };

      
      const objetosAtualizados = [novoObjeto, ...dados.objetos];
      salvarObjetos(objetosAtualizados);

      navegar("/achados-e-perdidos", {
        replace: true,
        state: { objetoCadastrado: true },
      });
    } catch {
      setErro("Não foi possível salvar o objeto. O armazenamento pode estar cheio ou bloqueado. Tente uma foto menor ou cadastre sem foto.");
    }
  }

  return (

    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <Cabecalho />

      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">

        <Link
          to="/achados-e-perdidos"
          className="text-sm font-bold text-blue-700 hover:underline"
        >
          ← Voltar

        </Link>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <h1 className="text-3xl font-bold">Encontrei um objeto</h1>

          <p className="mt-2 text-slate-500">
            Descreva o objeto encontrado e informe onde o dono pode retirá-lo. O registro aparecerá na lista e ficará salvo apenas neste navegador.

          </p>

          <form
            onSubmit={cadastrar}
            className="mt-8 grid gap-5 sm:grid-cols-2"
          >

            <div>

              <label htmlFor="objeto" className="mb-2 block text-sm font-bold">
                Nome do objeto

              </label>

              <input
                required
                type="text"
                id="objeto"
                name="objeto"
                maxLength={100}
                placeholder="Ex.: Mochila preta"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600"
              />

            </div>

            <div>

              <label htmlFor="categoria" className="mb-2 block text-sm font-bold">Categoria</label>

              <select
                required
                id="categoria"
                name="categoria"
                defaultValue=""
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-blue-600"
              >

                <option value="" disabled>
                  Selecione

                </option>

                {categorias.map(categoria => (

                  <option key={categoria}>{categoria}</option>
                ))}

              </select>

            </div>

            <div>

              <label htmlFor="local" className="mb-2 block text-sm font-bold">
                Local encontrado

              </label>

              <input
                required
                type="text"
                id="local"
                name="local"
                maxLength={100}
                placeholder="Ex.: Biblioteca"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600"
              />

            </div>

            <div>

              <label htmlFor="data" className="mb-2 block text-sm font-bold">Data</label>

              <input
                required
                type="date"
                max={hoje()}
                defaultValue={hoje()}
                id="data"
                name="data"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600"
              />

            </div>

            <div className="col-span-full">

              <label htmlFor="descricao" className="mb-2 block text-sm font-bold">Descrição</label>

              <textarea
                required
                id="descricao"
                name="descricao"
                maxLength={1000}
                rows={4}
                placeholder="Conte como é o objeto e onde exatamente ele foi encontrado."
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600"
              />

            </div>

            <div className="col-span-full">

              <label htmlFor="retirada" className="mb-2 block text-sm font-bold">Onde retirar o objeto</label>

              <input
                id="retirada"
                name="retirada"
                required
                maxLength={200}
                placeholder="Ex.: Foi entregue à secretaria da escola"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />

            </div>

            <div className="col-span-full">

              <label htmlFor="foto" className="mb-2 block text-sm font-bold">Foto do objeto (opcional)</label>

              <input
                id="foto"
                type="file"
                name="foto"
                accept="image/jpeg,image/png,image/webp"
                onChange={selecionarFoto}
                disabled={lendoFoto}
                aria-describedby="ajuda-foto"
                className="w-full rounded-lg border border-slate-300 p-3"
              />

              <p id="ajuda-foto" className="mt-2 text-sm text-slate-500">JPG, PNG ou WebP de até 2 MB.</p>

              {lendoFoto && (

                <p role="status">Carregando foto...</p>
              )}

              {erroFoto && (

                <p role="alert" className="mt-2 text-red-700">{erroFoto}</p>
              )}

              {(foto || erroFoto) && (

                <button
                  type="button"
                  className="mt-2 text-sm font-bold text-blue-700 hover:underline"
                  onClick={removerFoto}
                >Remover foto</button>
              )}

              {foto && (

                <img
                  src={foto}
                  alt="Prévia do objeto encontrado"
                  className="mt-3 max-h-56 rounded-lg object-contain"
                />
              )}

            </div>

            {erro && (

              <p role="alert" className="col-span-full rounded-lg bg-red-50 p-3 text-red-800">{erro}</p>
            )}

            <button
              type="submit"
              disabled={lendoFoto || Boolean(erroFoto)}
              className="col-span-full rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:opacity-50"
            >
              Cadastrar objeto

            </button>

          </form>

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
