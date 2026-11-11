import Cabecalho from "../componentes/cabecalho";
import { ChangeEvent, FormEvent, useState } from "react";
import { usePerfil, usePortal, type Usuario } from "../servicos/portal";
import { api, mensagemErro } from "../servicos/api";

type ConfiguracoesProps = {
  modoEscuro: boolean;
  mudarTema: () => void;
};

export default function Configuracoes({
  modoEscuro,
  mudarTema,
}:

 ConfiguracoesProps) {
  const perfil = usePerfil();
  const { setUsuario } = usePortal();
  const [enviando, setEnviando] = useState(false);
  const [lendoFoto, setLendoFoto] = useState(false);
  const [nome, setNome] = useState(perfil.nome);
  const [email, setEmail] = useState(perfil.email);
  const [foto, setFoto] = useState(perfil.foto);
  const [mensagem, setMensagem] = useState("");

  async function salvarConfiguracoes(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enviando || lendoFoto) return;
    setEnviando(true);
    try {
      const usuario = await api<Usuario>("/perfil", "PUT", { nome, email, foto });
      setUsuario(usuario); setMensagem("Configurações salvas com sucesso!");
    } catch(error) { setMensagem(mensagemErro(error)); }
    finally { setEnviando(false); }
  }

  function escolherFoto(evento: ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0];

    if (!arquivo) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(arquivo.type) || arquivo.size > 2 * 1024 * 1024) {
      setMensagem("Escolha uma imagem JPG, PNG ou WebP de até 2 MB."); return;
    }
    setLendoFoto(true);
    const leitor = new FileReader();
    leitor.onload = () => { setFoto(leitor.result as string); setLendoFoto(false); };
    leitor.onerror = () => { setMensagem("Não foi possível ler a imagem."); setLendoFoto(false); };
    leitor.readAsDataURL(arquivo);
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <Cabecalho />

      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">

        <p className="text-sm font-bold tracking-widest text-blue-600">MEU PERFIL</p>

        <h1 className="mt-2 text-3xl font-bold">Configurações</h1>

        <p className="mt-2 text-slate-500">Atualize suas informações e personalize o portal.</p>

        <form onSubmit={salvarConfiguracoes} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          
          <div className="flex flex-col items-center gap-4 border-b border-slate-200 pb-7 sm:flex-row">
            <img src={foto} alt="Prévia do perfil" className="h-24 w-24 rounded-full object-cover" />
            
            <div>
              <h2 className="font-bold">Foto de perfil</h2>

              <label htmlFor="foto-perfil" className="mt-2 inline-block cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800">
                Escolher foto
              </label>

              <input id="foto-perfil" type="file" disabled={lendoFoto} accept="image/jpeg,image/png,image/webp" onChange={escolherFoto} className="hidden" />
            </div>

          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">

            <div>
              
              <label className="mb-2 block text-sm font-bold">Nome</label>
              <input required minLength={3} maxLength={120} value={nome} onChange={(evento) => setNome(evento.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600" />
            
            </div>

            <div>

              <label className="mb-2 block text-sm font-bold">E-mail</label>
              <input required maxLength={254} type="email" value={email} onChange={(evento) => setEmail(evento.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600" />
            
            </div>


          </div>

          <div className="mt-7 border-t border-slate-200 pt-7">

            <h2 className="font-bold">Aparência</h2>

            <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 p-4">

              <div>
                <p className="font-bold">Modo escuro</p>
                <p className="text-sm text-slate-500">Use cores mais confortáveis para ambientes escuros.</p>
              </div>

              <button type="button" onClick={mudarTema} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800">
                {modoEscuro ? "Usar claro" : "Usar escuro"}
              </button>

            </div>

          </div>

          {mensagem && <p role="status" className="mt-5 text-sm font-bold text-green-700">{mensagem}</p>}

          <button disabled={enviando || lendoFoto} type="submit" className="mt-7 w-full rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800">Salvar alterações</button>
        
        </form>


      </section>

      <footer className="bg-blue-950 p-2 text-center text-sm font-bold text-white">Escola Estadual Sanico Teles</footer>
    </main>
  );
}
