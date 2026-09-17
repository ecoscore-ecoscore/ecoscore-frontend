const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
require("dotenv").config();

const dbModule = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de segurança de domínios (CORS)
app.use(cors({
  origin: true, // Permite o domínio atual
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANTE: Servir os arquivos da pasta 'public'
// Esta é a barreira de segurança. Tudo fora daqui é invisível para o navegador.
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1); 

const isProduction = process.env.NODE_ENV === "production" || !!process.env.VERCEL;

// Configuração de Sessão (Agora muito mais segura por estar no mesmo domínio)
app.use(
  session({
    name: "ecoscore.sid",
    secret: process.env.SESSION_SECRET || "ecoscore-fullstack-secret-2026",
    resave: true,
    saveUninitialized: false,
    rolling: true,
    proxy: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://ecoscore994_db_user:rRW1AeLn6tpShP0i@ac-d7cmtim-shard-00-00.bmqnwxt.mongodb.net:27017,ac-d7cmtim-shard-00-01.bmqnwxt.mongodb.net:27017,ac-d7cmtim-shard-00-02.bmqnwxt.mongodb.net:27017/test?ssl=true&authSource=admin&replicaSet=atlas-9tb2p0-shard-0&retryWrites=true&w=majority",
      ttl: 14 * 24 * 60 * 60,
      touchAfter: 60
    }),
    cookie: {
      httpOnly: true,
      secure: isProduction, // false em http localhost, true em HTTPS produção   
      sameSite: "lax",   
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    },
  }),
);

// Middleware de conexão com o banco
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      if (mongoose.connection.readyState !== 1) {
        await dbModule.connectToDatabase();
      }
    } catch (err) {
      console.error("❌ [DB ERROR]", err.message);
    }
  }
  next();
});

// Rotas da API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/coletas", require("./routes/coletas"));
app.use("/api/ranking", require("./routes/ranking"));
app.use("/api/recompensas", require("./routes/recompensas"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/super", require("./routes/super"));

app.get("/api/me", (req, res) => {
  if (req.session.admin) return res.json({ logado: true, tipo: "admin", ...req.session.admin });
  if (req.session.setor) return res.json({ logado: true, tipo: "setor", ...req.session.setor });
  if (req.session.funcionario) return res.json({ logado: true, tipo: "funcionario", ...req.session.funcionario });
  res.json({ logado: false });
});

// Redirecionamento de páginas: Qualquer rota não reconhecida pela API
// será tratada pelo frontend (SPA-like) ou retornará o index.html
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).json({ erro: "API não encontrada" });
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`🌿 EcoScore Full-Stack Online na porta ${PORT}`));

module.exports = app;
