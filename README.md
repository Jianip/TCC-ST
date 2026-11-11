# Portal do Aluno — frontend

React + TypeScript + Vite + Tailwind. Funciona com dados demonstrativos locais,
sem executar backend ou PostgreSQL.

```bash
npm ci
npm run dev
```

Abra http://localhost:5173. Os formulários
salvam exemplos somente neste navegador; login e cadastro não são autenticação real.

```bash
npx playwright install chromium
npm test
npm run build
```

[Execução, mocks, integração futura e pendências](DOCS/FRONTEND-INDEPENDENTE.md).
[Diagnóstico e inventário do trabalho anterior](DOCS/DIAGNOSTICO-ESCOPO.md).

O backend Java gerado anteriormente foi removido. A autenticação Node original
foi restaurada em `server/auth.mjs`, e os SQL originais foram restaurados sem execução.
`npm run server` inicia somente a autenticação Node; não é necessário para os mocks.
O banco PostgreSQL e a API Spring Boot serão desenvolvidos pessoalmente pelo aluno.
