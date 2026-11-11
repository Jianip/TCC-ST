export const categorias = ["Material escolar", "Roupas", "Acessórios", "Outros"];

export type Objeto = {
  id: string;
  podeEditar?: boolean;
  nome: string;
  categoria: string;
  local: string;
  data: string;
  descricao: string;
  retirada: string;
  foto: string;
  devolvido: boolean;
};

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
