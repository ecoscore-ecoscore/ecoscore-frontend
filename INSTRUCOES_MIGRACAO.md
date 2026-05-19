# Instruções para Deploy (Estrutura Separada)

O projeto já foi organizado fisicamente em duas pastas: `backend/` e `frontend/`. Siga estes passos para realizar o deploy de cada parte na Vercel:

## 1. Deploy do BACKEND (API)
1. No painel da Vercel, importe o repositório do projeto.
2. Na configuração do projeto, defina a **Root Directory** como `backend`.
3. Configure as seguintes **Variáveis de Ambiente**:
   - `MONGODB_URI`: Sua string de conexão do MongoDB Atlas.
   - `SESSION_SECRET`: Uma string aleatória para segurança da sessão.
   - `FRONTEND_URL`: A URL onde o seu frontend será hospedado (ex: `https://ecoscore-front.vercel.app`).
   - `NODE_ENV`: `production`
4. O backend será implantado como um projeto **Node.js**.

## 2. Deploy do FRONTEND (UI)
1. Crie um novo projeto na Vercel importando o mesmo repositório (ou um novo se você separar no GitHub).
2. Defina a **Root Directory** como `frontend`.
3. No arquivo `frontend/js/config.js`, certifique-se de que a constante `API_URL` aponta para a URL gerada para o seu backend:
   ```javascript
   const API_URL = 'https://seu-backend-ecoscore.vercel.app';
   ```
4. O frontend será implantado como um **Static Site**.

## 3. Configurações de CORS e Cookies
A comunicação entre o frontend e o backend agora é **Cross-Origin**. 
- O backend está preparado com o middleware `cors` para aceitar a URL definida em `FRONTEND_URL`.
- Os cookies de sessão estão configurados com `sameSite: 'none'` e `secure: true`, o que é obrigatório para que o login funcione entre domínios diferentes.

## 4. Teste Local
Para testar localmente com a nova estrutura:
1. **Backend:** `cd backend` -> `npm install` -> `npm start`.
2. **Frontend:** Use uma extensão como `Live Server` ou `npx serve frontend` para rodar os arquivos em uma porta diferente (ex: 5000).
3. O `js/config.js` detectará automaticamente o `localhost` e permitirá a comunicação.
