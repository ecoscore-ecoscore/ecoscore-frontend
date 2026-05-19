const express = require('express');
const bcrypt = require('bcryptjs');
const { Empresa, Admin, Setor, Funcionario } = require('../database');
const router = express.Router();

// POST /api/auth/register-company — Cadastro de nova empresa
router.post('/register-company', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  try {
    const senhaHash = bcrypt.hashSync(senha, 10);
    
    // Criar empresa
    const empresa = await Empresa.create({
      nome,
      email,
      senha: senhaHash
    });

    // Criar um admin padrão para esta empresa
    await Admin.create({
      usuario: 'admin',
      senha: senhaHash,
      empresa_id: empresa._id
    });

    res.status(201).json({ sucesso: true, mensagem: 'Empresa cadastrada com sucesso' });
  } catch (err) {
    console.error('[AUTH ERROR]', err);
    if (err.code === 11000) { // MongoDB duplicate key error
      return res.status(409).json({ erro: 'Este e-mail já está cadastrado' });
    }
    res.status(500).json({ erro: 'Erro interno ao cadastrar empresa' });
  }
});

// POST /api/auth/login — login unificado (identifica tipo automaticamente)
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;
  if (!login || !senha) return res.status(400).json({ erro: 'Login e senha obrigatórios' });

  try {
    // 0. Tentar como Super Admin (Admin do Sistema - Sem Empresa)
    const superAdmin = await Admin.findOne({ usuario: login, empresa_id: null });
    if (superAdmin && bcrypt.compareSync(senha, superAdmin.senha)) {
      req.session.admin = { 
        id: superAdmin._id, 
        usuario: superAdmin.usuario, 
        empresa_id: null,
        empresa_nome: 'EcoScore Master'
      };
      return res.json({ sucesso: true, tipo: 'super', redirecionar: '/super-admin.html' });
    }

    // 1. Tentar como Empresa/Admin (E-mail)
    const empresa = await Empresa.findOne({ email: login });
    if (empresa && bcrypt.compareSync(senha, empresa.senha)) {
      const admin = await Admin.findOne({ empresa_id: empresa._id });
      req.session.admin = { 
        id: admin ? admin._id : empresa._id, 
        usuario: admin ? admin.usuario : 'admin', 
        empresa_id: empresa._id,
        empresa_nome: empresa.nome
      };
      return res.json({ sucesso: true, tipo: 'admin', redirecionar: '/admin.html' });
    }

    // 2. Tentar como Setor (Login)
    const setor = await Setor.findOne({ login: login, ativo: 1 });
    if (setor && bcrypt.compareSync(senha, setor.senha)) {
      req.session.setor = {
        id: setor._id,
        nome: setor.nome,
        login: setor.login,
        dia_semana: setor.dia_semana,
        empresa_id: setor.empresa_id
      };
      return res.json({ sucesso: true, tipo: 'setor', redirecionar: '/dashboard.html' });
    }

    // 3. Tentar como Funcionário (E-mail)
    const func = await Funcionario.findOne({ email: login, ativo: 1 }).populate('setor_id');
    if (func && bcrypt.compareSync(senha, func.senha)) {
      req.session.funcionario = {
        id: func._id,
        nome: func.nome,
        email: func.email,
        setor_id: func.setor_id ? func.setor_id._id : null,
        setor_nome: func.setor_id ? func.setor_id.nome : null,
        dia_semana: func.setor_id ? func.setor_id.dia_semana : null,
        empresa_id: func.empresa_id
      };
      return res.json({ sucesso: true, tipo: 'funcionario', redirecionar: '/user.html' });
    }

    res.status(401).json({ erro: 'Credenciais incorretas ou usuário inativo' });
  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    res.status(500).json({ erro: 'Erro interno ao processar login' });
  }
});

// POST /api/auth/funcionario/login — login do funcionário (mantido por compatibilidade)
router.post('/funcionario/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ erro: 'E-mail e senha obrigatórios' });

  try {
    const func = await Funcionario.findOne({ email: email, ativo: 1 }).populate('setor_id');

    if (!func) return res.status(401).json({ erro: 'E-mail ou senha incorretos' });

    const senhaOk = bcrypt.compareSync(senha, func.senha);
    if (!senhaOk) return res.status(401).json({ erro: 'E-mail ou senha incorretos' });

    req.session.funcionario = {
      id: func._id,
      nome: func.nome,
      email: func.email,
      setor_id: func.setor_id ? func.setor_id._id : null,
      setor_nome: func.setor_id ? func.setor_id.nome : null,
      dia_semana: func.setor_id ? func.setor_id.dia_semana : null,
      empresa_id: func.empresa_id
    };

    res.json({ sucesso: true, funcionario: req.session.funcionario });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ sucesso: true });
});

module.exports = router;
