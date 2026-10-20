
const portugues = {"disciplina": "Língua Portuguesa"};
const matematica = {"disciplina": "Matemática"};
const historia = {"disciplina": "História"};
const geografia = {"disciplina": "Geografia"};
const ingles = {"disciplina": "Inglês"};
const educacaoFisica = {"disciplina": "Educação Física"};
const arte = {"disciplina": "Arte"};
const biologia = {"disciplina": "Biologia"};
const fisica = {"disciplina": "Física"};
const quimica = {"disciplina": "Química"};
const filosofia = {"disciplina": "Filosofia"};
const sociologia = {"disciplina": "Sociologia"};
const aulaTecnica = {"disciplina": "Componente técnico"};

export const grades = [
  {
    turma: "1.1",
    aulas: [
      [historia, educacaoFisica, fisica, sociologia, historia],
      [geografia, arte, quimica, portugues, geografia],
      [ingles, biologia, filosofia, matematica, ingles],
      [educacaoFisica, fisica, sociologia, historia, educacaoFisica],
      [arte, quimica, portugues, geografia, arte],
      [biologia, filosofia, matematica, ingles, biologia],
      [fisica, sociologia, historia, educacaoFisica, fisica],
    ],
  },
  {
    turma: "1 Técnico",
    aulas: [
      [geografia, arte, quimica, portugues, geografia],
      [ingles, biologia, filosofia, matematica, ingles],
      [educacaoFisica, fisica, sociologia, historia, educacaoFisica],
      [arte, quimica, portugues, geografia, arte],
      [biologia, filosofia, matematica, ingles, biologia],
      [fisica, sociologia, historia, educacaoFisica, fisica],
      [quimica, portugues, geografia, arte, quimica],
      [aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica],
      [aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica],
    ],
  },
  {
    turma: "1.2",
    aulas: [
      [ingles, biologia, filosofia, matematica, ingles],
      [educacaoFisica, fisica, sociologia, historia, educacaoFisica],
      [arte, quimica, portugues, geografia, arte],
      [biologia, filosofia, matematica, ingles, biologia],
      [fisica, sociologia, historia, educacaoFisica, fisica],
      [quimica, portugues, geografia, arte, quimica],
      [filosofia, matematica, ingles, biologia, filosofia],
    ],
  },
  {
    turma: "2.1",
    aulas: [
      [educacaoFisica, fisica, sociologia, historia, educacaoFisica],
      [arte, quimica, portugues, geografia, arte],
      [biologia, filosofia, matematica, ingles, biologia],
      [fisica, sociologia, historia, educacaoFisica, fisica],
      [quimica, portugues, geografia, arte, quimica],
      [filosofia, matematica, ingles, biologia, filosofia],
      [sociologia, historia, educacaoFisica, fisica, sociologia],
    ],
  },
  {
    turma: "2 Técnico",
    aulas: [
      [arte, quimica, portugues, geografia, arte],
      [biologia, filosofia, matematica, ingles, biologia],
      [fisica, sociologia, historia, educacaoFisica, fisica],
      [quimica, portugues, geografia, arte, quimica],
      [filosofia, matematica, ingles, biologia, filosofia],
      [sociologia, historia, educacaoFisica, fisica, sociologia],
      [portugues, geografia, arte, quimica, portugues],
      [aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica],
      [aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica],
    ],
  },
  {
    turma: "3.1",
    aulas: [
      [biologia, filosofia, matematica, ingles, biologia],
      [fisica, sociologia, historia, educacaoFisica, fisica],
      [quimica, portugues, geografia, arte, quimica],
      [filosofia, matematica, ingles, biologia, filosofia],
      [sociologia, historia, educacaoFisica, fisica, sociologia],
      [portugues, geografia, arte, quimica, portugues],
      [matematica, ingles, biologia, filosofia, matematica],
    ],
  },
  {
    turma: "3 Técnico",
    aulas: [
      [fisica, sociologia, historia, educacaoFisica, fisica],
      [quimica, portugues, geografia, arte, quimica],
      [filosofia, matematica, ingles, biologia, filosofia],
      [sociologia, historia, educacaoFisica, fisica, sociologia],
      [portugues, geografia, arte, quimica, portugues],
      [matematica, ingles, biologia, filosofia, matematica],
      [historia, educacaoFisica, fisica, sociologia, historia],
      [aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica],
      [aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica, aulaTecnica],
    ],
  },
  {
    turma: "3.2",
    aulas: [
      [quimica, portugues, geografia, arte, quimica],
      [filosofia, matematica, ingles, biologia, filosofia],
      [sociologia, historia, educacaoFisica, fisica, sociologia],
      [portugues, geografia, arte, quimica, portugues],
      [matematica, ingles, biologia, filosofia, matematica],
      [historia, educacaoFisica, fisica, sociologia, historia],
      [geografia, arte, quimica, portugues, geografia],
    ],
  },
];

