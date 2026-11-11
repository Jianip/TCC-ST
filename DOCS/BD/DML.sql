-- Dados de referência demonstrativos do Portal Escolar.
-- Não cria contas, senhas, alunos, agenda pessoal, inscrições nem objetos.
-- Matrículas, usuários e dados pessoais devem ser cadastrados com dados reais
-- e senha armazenada como hash pelo sistema de autenticação.

INSERT INTO turma (nome, ano_letivo, periodo, modalidade) VALUES
('9.1', 2026, 'Matutino', 'Regular'),
('9.2', 2026, 'Matutino', 'Regular'),
('1.1', 2026, 'Matutino', 'Regular'),
('1 Técnico', 2026, 'Integral', 'Técnico'),
('1.2', 2026, 'Matutino', 'Regular'),
('2.1', 2026, 'Matutino', 'Regular'),
('2 Técnico', 2026, 'Integral', 'Técnico'),
('2.2', 2026, 'Matutino', 'Regular'),
('3.1', 2026, 'Matutino', 'Regular'),
('3 Técnico', 2026, 'Integral', 'Técnico'),
('3.2', 2026, 'Matutino', 'Regular')
ON CONFLICT (ano_letivo, nome) DO NOTHING;

INSERT INTO disciplina (nome, descricao) VALUES
('Artes', 'Artes e expressão artística.'),
('Arte', 'Artes e expressão artística.'),
('Banco de Dados', 'Modelagem e manipulação de bancos de dados.'),
('Biologia', 'Estudo dos seres vivos.'),
('Ciências Criativas', 'Atividades interdisciplinares de criação e investigação.'),
('Conexão Matemática', 'Atividades de aprofundamento em matemática.'),
('Cultura e Comunicação', 'Comunicação, cultura e produção de conteúdo.'),
('Eletiva', 'Componente curricular eletivo.'),
('Educação Digital', 'Tecnologias digitais e cidadania.'),
('Educação Física', 'Práticas corporais e saúde.'),
('Estudos Orientados', 'Acompanhamento e organização dos estudos.'),
('Ferramenta para o Mundo do Trabalho', 'Competências e ferramentas para o mundo do trabalho.'),
('Filosofia', 'Reflexão filosófica e pensamento crítico.'),
('Física', 'Estudo dos fenômenos físicos.'),
('Fundamentos de IA', 'Fundamentos de inteligência artificial.'),
('Geografia', 'Estudo do espaço geográfico e da sociedade.'),
('História', 'Estudo dos acontecimentos históricos.'),
('Inglês', 'Língua inglesa.'),
('Interação Cidadã', 'Participação social e cidadania.'),
('Intervenção Cidadã', 'Projetos de participação e intervenção cidadã.'),
('Java', 'Programação com a linguagem Java.'),
('Laboratório de Hardware', 'Práticas de montagem e manutenção de hardware.'),
('Laboratório de Software', 'Práticas de desenvolvimento e teste de software.'),
('Leitura e Produção', 'Leitura, interpretação e produção textual.'),
('Língua Inglesa', 'Língua inglesa.'),
('Língua Portuguesa', 'Leitura, interpretação e produção em língua portuguesa.'),
('Matemática', 'Álgebra, geometria e estatística.'),
('Nivelamento em Língua Inglesa', 'Aprofundamento de língua inglesa.'),
('Nivelamento em Matemática', 'Aprofundamento de matemática.'),
('Nivelamento em Português', 'Aprofundamento de língua portuguesa.'),
('Programação', 'Lógica de programação e desenvolvimento de sistemas.'),
('Práticas Experimentais', 'Atividades práticas e experimentais.'),
('Práticas Profissionais', 'Práticas e projetos profissionais.'),
('Projeto de Vida', 'Planejamento pessoal e projeto de vida.'),
('Português', 'Leitura, interpretação e produção de textos.'),
('Química', 'Estudo da matéria e suas transformações.'),
('Redação', 'Produção textual e redação.'),
('Redes', 'Fundamentos de redes de computadores.'),
('React', 'Desenvolvimento de interfaces com React.'),
('Responsabilidade Social', 'Ética, responsabilidade e participação social.'),
('Sem aula', 'Registro de período sem aula.'),
('Soluções Matemáticas', 'Resolução de problemas e aplicações matemáticas.'),
('Sociologia', 'Estudo das relações sociais.'),
('Sustentabilidade', 'Sustentabilidade e meio ambiente.'),
('Sistemas de Energia Renovável', 'Tecnologias de geração de energia renovável.')
ON CONFLICT (nome) DO NOTHING;

INSERT INTO categoria_clube (nome, cor_css, icone) VALUES
('Raciocínio', 'bg-orange-600', '♟️'),
('Literatura', 'bg-pink-600', '📚'),
('Tecnologia', 'bg-blue-600', '🤖'),
('Arte e cultura', 'bg-purple-600', '🎭'),
('Esportes', 'bg-red-600', '⚽'),
('Mídia & Comunicação', 'bg-yellow-600', '📻')
ON CONFLICT (nome) DO NOTHING;

INSERT INTO clube
(slug, categoria_id, nome, lider, descricao, atividades, dias, horario, local, imagem_url)
SELECT v.slug, c.id, v.nome, v.lider, v.descricao, v.atividades, v.dias, v.horario, v.local, v.imagem_url
FROM (VALUES
 ('esportes', 'Esportes', 'Clube de Esportes', 'Emillin', 'Organização de campeonatos internos e treinos para os times representativos da escola.', 'Campeonatos internos de futsal, vôlei e basquete, além de treinos das equipes da escola.', 'Segunda, quarta e sexta', '13h15', 'Quadra Poliesportiva', '/imagens/esporte.jpeg'),
 ('taekwondo', 'Esportes', 'Clube de Taekwondo', 'Anderson Carolino Mendes', 'Prática de artes marciais focada em disciplina, defesa pessoal, autocontrole e condicionamento físico.', 'Prática de taekwondo, exercícios de defesa pessoal e condicionamento físico.', 'Terça e quinta', '16h00', 'Quadra Poliesportiva', '/imagens/taekondow.jpeg'),
 ('coral-canto', 'Arte e cultura', 'Clube de Coral & Canto', 'Leandro Morais', 'Técnica vocal, percepção musical e ensaios de canto em grupo.', 'Exercícios de técnica vocal, ensaios em grupo e apresentações nos eventos da escola.', 'A confirmar', 'A confirmar', 'Auditório / Sala 19', '/imagens/coral.jpeg'),
 ('radio-podcast', 'Mídia & Comunicação', 'Clube de Rádio & Podcast', 'Wanderley e Anderson Baptista', 'Produção de podcasts e entrevistas com a comunidade escolar.', 'Gravação e edição de podcasts, locução nos intervalos e entrevistas.', 'Terça e quinta', '16h00', 'Sala da Rádio', '/imagens/podcast.jpeg'),
 ('robotica', 'Tecnologia', 'Clube de Robótica', 'Marcos Júnior', 'Construção de protótipos, automação e introdução à programação de circuitos.', 'Montagem de protótipos, introdução à programação e projetos de robótica.', 'Quartas', '13h15', 'Sala Maker', '/imagens/robotica.jpeg'),
 ('leitura', 'Literatura', 'Clube do Livro', 'Letícia', 'Leituras e conversas sobre literatura contemporânea, mangás e clássicos.', 'Rodas de leitura, troca de indicações e conversas sobre livros.', 'Sextas', '13h20', 'Espaço de Leitura', '/imagens/leitura.jpeg'),
 ('teatro', 'Arte e cultura', 'Clube de Teatro', 'Thales', 'Espaço para desenvolver oratória, expressão corporal e atuação.', 'Exercícios de oratória e expressão corporal, peças escolares e improviso.', 'Terças', '13h30', 'Auditório', '/imagens/teatro.jpeg'),
 ('xadrez', 'Raciocínio', 'Clube de Xadrez', 'Samuel', 'Treinos de aberturas, táticas e torneios internos para todos os níveis.', 'Treinos de aberturas e táticas de xadrez e torneios internos.', 'Quintas', '13h30', 'Biblioteca', '/imagens/xadrez.jpeg')
) AS v(slug, categoria, nome, lider, descricao, atividades, dias, horario, local, imagem_url)
JOIN categoria_clube c ON c.nome = v.categoria
ON CONFLICT (slug) DO NOTHING;

INSERT INTO modalidade_cardapio (nome) VALUES
('Ensino Integral'), ('Ensino Regular')
ON CONFLICT (nome) DO NOTHING;

-- Cardápio da semana 02/11 a 06/11/2026, conforme conteúdo demonstrativo do frontend.
INSERT INTO cardapio_semanal (modalidade_id, data_inicio, data_fim)
SELECT id, DATE '2026-11-02', DATE '2026-11-06'
FROM modalidade_cardapio
WHERE nome IN ('Ensino Integral', 'Ensino Regular')
ON CONFLICT (modalidade_id, data_inicio) DO NOTHING;

INSERT INTO refeicao_cardapio (cardapio_id, dia_semana, almoco, lanche)
SELECT cs.id, v.dia_semana, v.almoco, v.lanche
FROM (VALUES
 ('Ensino Integral', 1, 'Feriado – Dia de Finados', ''),
 ('Ensino Integral', 2, 'Arroz, feijão, macarronada à bolonhesa, salada e fruta.', 'Café com leite e pão doce.'),
 ('Ensino Integral', 3, 'Arroz, feijão, cubos suínos com mandioca, salada e fruta.', 'Bolo de banana e suco.'),
 ('Ensino Integral', 4, 'Arroz de forno, tutu de feijão, salada e fruta.', 'Biscoito de polvilho com suco.'),
 ('Ensino Integral', 5, 'Peixe com batatas, arroz, feijão, salada e fruta.', 'Vitamina de frutas maduras (sem açúcar) e biscoito.'),
 ('Ensino Regular', 1, 'Feriado de Finados', ''),
 ('Ensino Regular', 2, 'Macarrão ao molho de frango com feijão inteiro, salada e fruta.', ''),
 ('Ensino Regular', 3, 'Arroz com banana e carne, feijão, salada e fruta. A banana poderá ser servida separadamente.', ''),
 ('Ensino Regular', 4, 'Canjiquinha com músculo e hortaliças, salada e fruta.', ''),
 ('Ensino Regular', 5, 'Feijoada light e arroz, salada de folhas e fruta (laranja).', '')
) AS v(modalidade, dia_semana, almoco, lanche)
JOIN modalidade_cardapio m ON m.nome = v.modalidade
JOIN cardapio_semanal cs ON cs.modalidade_id = m.id AND cs.data_inicio = DATE '2026-11-02'
ON CONFLICT (cardapio_id, dia_semana) DO NOTHING;

-- Eventos ilustrativos. datas-comemorativas.ts contém campanhas recorrentes
-- somente como texto e mês; não foram convertidas em datas exatas inventadas.
INSERT INTO evento (titulo, descricao, categoria, data_inicio, data_fim, horario) VALUES
('Feira de Ciências', 'Exposição dos projetos dos alunos.', 'Acadêmico', DATE '2026-10-20', DATE '2026-10-20', TIME '09:00'),
('Jogos Escolares', 'Competições esportivas entre as turmas.', 'Acadêmico', DATE '2026-10-23', DATE '2026-10-23', TIME '08:00'),
('Apresentação dos TCCs', 'Apresentação dos trabalhos de conclusão de curso.', 'Acadêmico', DATE '2026-11-25', DATE '2026-11-25', TIME '10:00')
ON CONFLICT DO NOTHING;
