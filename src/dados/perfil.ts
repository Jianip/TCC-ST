export type Perfil = {
  nome: string;
  email: string;
  foto: string;
};

const chave = "perfil-escolar:demonstracao";

export function pegarPerfil(): Perfil {
  const padrao = {
    nome: "Aluno",
    email: "",
    foto: "/imagens/perfil-tcc.png",
  };

  try {
    const texto = localStorage.getItem(chave);

    if (texto === null) {
      return padrao;
    }

    const perfil = JSON.parse(texto);

    if (perfil === null || typeof perfil !== "object") {
      return padrao;
    }

    if (typeof perfil.nome !== "string" || typeof perfil.email !== "string" || typeof perfil.foto !== "string") {
      return padrao;
    }

    return perfil;
  } catch {
    return padrao;
  }

}

export function salvarPerfil(perfil: Perfil) {
  localStorage.setItem(chave, JSON.stringify(perfil));
}
