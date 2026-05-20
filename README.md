# EcoScore - Frontend

Interface web para o sistema de gestão de resíduos recicláveis EcoScore.

## 🚀 Setup Local

```bash
# Opção 1: Usar Live Server (VS Code)
# Instale a extensão "Live Server" e clique "Go Live"

# Opção 2: Usar npx serve
npx serve . -p 5000

# Opção 3: Usar Python (se tiver instalado)
python -m http.server 5000
```

Acesse: `http://localhost:5000`

---

## ⚙️ Configurar API Backend

Edite `js/config.js` e atualize a URL:

```javascript
const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? ""
    : "https://seu-backend-ecoscore.vercel.app";
```

---

## 📄 Páginas

| Página                  | Descrição                   | Acesso               |
| ----------------------- | --------------------------- | -------------------- |
| `index.html`            | Página inicial              | Público              |
| `login.html`            | Login (todas as permissões) | Público              |
| `cadastro-empresa.html` | Registro de empresa         | Público              |
| `admin.html`            | Dashboard admin             | Empresa/Admin        |
| `dashboard.html`        | Coleta de resíduos          | Setor                |
| `user.html`             | Perfil do funcionário       | Funcionário          |
| `super-admin.html`      | Super admin                 | Super admin          |
| `ranking.html`          | Rankings                    | Todos (autenticados) |
| `recompensas.html`      | Recompensas                 | Todos (autenticados) |
| `relatorios.html`       | Relatórios                  | Admin/Super admin    |
| `registro.html`         | Registro manual de coletas  | Setor                |

---

## 🌐 Deploy na Vercel

1. **Conectar repositório:**

   ```
   Vercel → Add New → Project → Conectar repositório
   ```

2. **Configurar Root Directory:**

   ```
   Root Directory: . (raiz do repositório)
   ```

3. **Build Command:**

   ```
   (deixar vazio - é site estático)
   ```

4. **Output Directory:**

   ```
   . (raiz)
   ```

5. **Deploy:**
   ```
   Clique em Deploy
   ```

---

## 📁 Estrutura

```
├── index.html                 # Página inicial
├── login.html                 # Login
├── cadastro-empresa.html      # Registro
├── admin.html                 # Dashboard admin
├── dashboard.html             # Coleta (setor)
├── user.html                  # Perfil (funcionário)
├── super-admin.html           # Super admin
├── ranking.html               # Rankings
├── recompensas.html           # Recompensas
├── relatorios.html            # Relatórios
├── registro.html              # Registro manual
├── css/
│   └── style.css              # Estilos únicos
├── js/
│   └── config.js              # Configuração de API
└── README.md
```

---

## 🔧 Desenvolvendo

### Estrutura do config.js

```javascript
const API_URL = "..."; // URL do backend

async function apiFetch(endpoint, options = {}) {
  // Helper automático que:
  // - Adiciona API_URL automaticamente
  // - Envia credenciais/cookies
  // - Serializa JSON
  // - Trata erros
}
```

### Como usar em uma página

```javascript
// Fazer login
const res = await apiFetch("/api/auth/login", {
  method: "POST",
  body: { login: "email@empresa.com", senha: "senha" },
});

const data = res.json ? await res.json() : res;

// Carregar dados
const coletas = await apiFetch("/api/coletas");
```

---

## 🐛 Troubleshooting

### Erro de CORS

- Verifique se o backend está rodando
- Verifique URL em `js/config.js`
- Verifique `FRONTEND_URL` no `.env` do backend

### Login não funciona

- Teste as credenciais em `/api/auth/test-credentials`
- Verifique se o backend conecta ao MongoDB
- Abra DevTools → Console para ver erros

### Página em branco

- Abra DevTools → Console
- Verifique se há erros de sintaxe
- Verifique se `config.js` está sendo carregado

---

**Status:** ✅ Pronto para produção
