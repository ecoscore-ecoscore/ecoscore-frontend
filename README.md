# Este repositório contém apenas o FRONTEND

## ⚠️ Arquitetura Separada

Este repositório é dedicado ao **FRONTEND** (UI HTML/CSS/JS).

O **BACKEND** (API Node.js) está em: https://github.com/ecoscore-ecoscore/ecoscore-backend

---

## 📂 Estrutura

```
frontend/
  ├── index.html              # Página inicial
  ├── login.html              # Login
  ├── admin.html              # Dashboard
  ├── css/
  │   └── style.css           # Estilos
  ├── js/
  │   └── config.js           # Config API
  └── ... (outras páginas)
```

## 🚀 Deploy

Vercel detecta automaticamente como site estático.

```
Root Directory: . (raiz)
Build Command: (vazio)
```

## 🔗 Conectado ao Backend

Certifique-se de atualizar `js/config.js`:

```javascript
const API_URL = "https://seu-backend.vercel.app";
```

---

**Mais detalhes:** Veja `frontend/README.md`
