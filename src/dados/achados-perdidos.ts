export const categorias = ["Material escolar", "Roupas", "Acessórios", "Outros"];

export type Objeto = {
  id: string;
  nome: string;
  categoria: string;
  local: string;
  data: string;
  descricao: string;
  retirada: string;
  foto: string;
  devolvido: boolean;
};

const chave = "achados-perdidos-escolar-v1";

const exemplos: Objeto[] = [
  {
    id: "exemplo-mochila",
    nome: "Mochila Roxa",
    categoria: "Material escolar",
    local: "Biblioteca",
    data: "2026-08-19",
    descricao: "A mochila tem um pompom roxo na lateral e estava em um canto no chão perto dos livros.",
    retirada: "",
    foto: "/imagens/mochila-roxa.jpeg",
    devolvido: false,
  },

  {
    id: "exemplo-chaveiro",
    nome: "Chaveiro",
    categoria: "Acessórios",
    local: "Quadra",
    data: "2026-08-24",
    descricao: "Tem duas chaves e três chaveiros: um de morango, outro de coração rosa e um da Torre Eiffel.",
    retirada: "",
    foto: "/imagens/chaveiro.png",
    devolvido: false,
  },

  {
    id: "exemplo-moletom",
    nome: "Moletom Azul Claro",
    categoria: "Roupas",
    local: "Sala de aula",
    data: "2026-08-19",
    descricao: "Foi encontrado na sala 20, caído no chão perto da mesa do professor. O moletom não tem nenhum desenho.",
    retirada: "",
    foto: "/imagens/moletom-azul.png",
    devolvido: false,
  },

];

export function hoje() {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return ano + "-" + mes + "-" + dia;
}

export function dataValida(data: string) {
  if (data.length !== 10) {
    return false;
  }

  const valor = new Date(data + "T12:00:00Z");

  if (Number.isNaN(valor.getTime())) {
    return false;
  }

  const dataConferida = valor.toISOString().slice(0, 10);

  return dataConferida === data;
}

function objetoValido(objeto: Objeto) {
  if (objeto === null || typeof objeto !== "object") {
    return false;
  }

  const textos = [
    objeto.id, objeto.nome, objeto.categoria, objeto.local,
    objeto.data, objeto.descricao, objeto.retirada, objeto.foto,
  ];

  for (const texto of textos) {
    if (typeof texto !== "string") {
      return false;
    }

  }

  if (typeof objeto.devolvido !== "boolean") {
    return false;
  }

  return dataValida(objeto.data);
}

export function carregarObjetos(): { objetos: Objeto[]; erro: string } {
  const falha = {
    objetos: [],
    erro: "Não foi possível carregar os registros salvos. Verifique o armazenamento do navegador antes de tentar novamente.",
  };

  try {
    const salvo = localStorage.getItem(chave);

    if (salvo === null) {
      return { objetos: exemplos, erro: "" };
    }

    const objetos = JSON.parse(salvo);

    if (!Array.isArray(objetos)) {
      return falha;
    }

    for (const objeto of objetos) {
      if (!objetoValido(objeto)) {
        return falha;
      }

    }

    return { objetos, erro: "" };
  } catch {
    return falha;
  }

}

export function salvarObjetos(objetos: Objeto[]) {
  const texto = JSON.stringify(objetos);

  localStorage.setItem(chave, texto);
}

type Filtros = {
  busca: string;
  categoria: string;
  local: string;
  data: string;
  status: string;
};

export function filtrarObjetos(objetos: Objeto[], filtros: Filtros) {
  const resultado: Objeto[] = [];
  const busca = filtros.busca.toLowerCase();

  for (const objeto of objetos) {
    const texto = (objeto.nome + " " + objeto.descricao).toLowerCase();

    if (!texto.includes(busca)) {
      continue;
    }

    if (filtros.categoria !== "" && objeto.categoria !== filtros.categoria) {
      continue;
    }

    if (filtros.local !== "" && objeto.local !== filtros.local) {
      continue;
    }

    if (filtros.data !== "" && objeto.data !== filtros.data) {
      continue;
    }

    if (filtros.status === "devolvido" && objeto.devolvido === false) {
      continue;
    }

    if (filtros.status === "disponivel" && objeto.devolvido === true) {
      continue;
    }

    resultado.push(objeto);
  }

  resultado.sort((primeiro, segundo) => {
    return segundo.data.localeCompare(primeiro.data);
  });

  return resultado;
}
