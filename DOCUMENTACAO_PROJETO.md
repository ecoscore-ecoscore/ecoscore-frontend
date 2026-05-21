# 🌿 EcoScore — Gestão de Resíduos & Gamificação Corporativa

O **EcoScore** é uma plataforma SaaS (Software as a Service) desenvolvida para empresas que desejam profissionalizar a gestão de resíduos recicláveis, engajando seus colaboradores através de um sistema de pontuação e recompensas (gamificação).

---

## 🚀 Como o Projeto Funciona

O sistema é estruturado em uma hierarquia de quatro níveis para garantir segurança, organização e controle total dos dados.

### 1. Nível Master (Administrador do Sistema)
*   **Acesso:** Administrador Global.
*   **Função:** Cadastrar novas empresas parceiras no ecossistema.
*   **Gestão:** Possui poder de exclusão em cascata (ao remover uma empresa, todos os seus dados vinculados são apagados para manter a integridade do banco).

### 2. Nível Empresa (Administrador da Unidade)
*   **Acesso:** Gestor de Sustentabilidade / RH.
*   **Função:** 
    *   Cadastrar os **Setores** (ex: TI, Marketing, Produção) e definir seus dias oficiais de coleta.
    *   Cadastrar os **Funcionários** vinculados a cada setor.
    *   Gerenciar o **Catálogo de Recompensas** (Individual e Coletiva).
    *   Visualizar relatórios de impacto ambiental e rankings internos.

### 3. Nível Setor (Ponto de Coleta)
*   **Acesso:** Líder de Setor.
*   **Função:**
    *   **Registrar Coletas:** Pesar o material descartado pelos funcionários e lançar no sistema usando um buscador inteligente.
    *   **Validar Resgates:** Aprovar a entrega física das recompensas solicitadas pelos funcionários, confirmando o débito dos pontos.
*   **Trava Logística:** O registro só é liberado nos dias da semana pré-definidos pela empresa.

### 4. Nível Funcionário (Colaborador)
*   **Acesso:** Todos os funcionários cadastrados.
*   **Função:** 
    *   **Meu EcoPerfil:** Acompanhar saldo de pontos e histórico pessoal de descartes.
    *   **Shopping de Prêmios:** Visualizar recompensas disponíveis e solicitar o resgate (o sistema debita os pontos automaticamente da "conta" do funcionário).

---

## 📊 Regras de Pontuação (Padrão)

A pontuação é calculada automaticamente baseada no peso (KG) e no tipo de material:
*   **Metal:** 10 pontos por kg.
*   **Vidro:** 7 pontos por kg.
*   **Plástico:** 5 pontos por kg.
*   **Papel:** 3 pontos por kg.

---

## 🛠️ Arquitetura Técnica

*   **Backend:** Node.js com Express.js rodando em ambiente Serverless (Vercel).
*   **Frontend:** Interface responsiva em HTML5, CSS3 (Vanilla) e JavaScript Vanilla.
*   **Banco de Dados:** MongoDB Atlas (NoSQL) com sessões persistentes via `connect-mongo`.
*   **Segurança:** 
    *   Autenticação via Cookies Seguros (`SameSite: None`, `Secure`).
    *   Criptografia de senhas com `bcryptjs`.
    *   Isolamento de dados por `empresa_id` (Multi-tenancy).

---

## 🔑 Credenciais de Teste (Padrão)

| Nível | Login | Senha |
| :--- | :--- | :--- |
| **Super Admin** | `eco_master` | `eco123` |
| **Admin Empresa** | `ecoscore994@gmail.com` | `ecoscoreadmin` |

---

## 📈 Benefícios ESG
O EcoScore não apenas organiza a reciclagem, mas gera valor para a marca:
1.  **Redução de Pegada de Carbono:** Dados reais para relatórios de sustentabilidade.
2.  **Cultura Organizacional:** Engajamento dos colaboradores com o propósito da empresa.
3.  **Economia Circular:** Incentivo ao descarte correto que pode gerar receita com a venda de recicláveis de alta pureza.

---
**Status do Projeto:** ✅ Versão 1.0 - Estabilizada e pronta para produção.
