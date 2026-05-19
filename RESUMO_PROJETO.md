# Resumo da Evolução do Projeto EcoScore

Este documento detalha todas as melhorias e mudanças estruturais realizadas no sistema EcoScore para transformá-lo de um protótipo local em uma aplicação pronta para produção na nuvem.

---

## 1. Análise e Diagnóstico Inicial
*   **Arquitetura Original:** Monolito Node.js (Express + HTML Estático).
*   **Banco de Dados:** SQLite local (`ecoscore.db`).
*   **Limitação Identificada:** Incompatibilidade com ambientes Serverless (como Vercel) devido à perda de persistência de dados no sistema de arquivos local.

## 2. Novas Funcionalidades e Regras de Negócio
*   **Registro por Funcionário:** Implementada a capacidade de o próprio colaborador registrar seus descartes na tela de perfil (`user.html`).
*   **Trava Logística:** Validação do dia da semana para coletas. O sistema agora bloqueia registros feitos fora do dia agendado para o setor, garantindo conformidade com a logística da empresa.
*   **UI/UX:** Adição de feedbacks em tempo real, contadores de pontos animados e histórico de descartes com ícones representativos por material.

## 3. Migração para MongoDB (Nuvem)
*   **Tecnologia:** Substituição do `node:sqlite` pelo **MongoDB** com a biblioteca **Mongoose**.
*   **Modelagem NoSQL:** Criação de schemas para todas as entidades (Empresas, Admins, Setores, Funcionários, Coletas, Recompensas e Resgates).
*   **Refatoração de API:** Conversão de todas as queries SQL para operações e agregações assíncronas do Mongoose.
*   **Persistência:** Os dados agora são armazenados em um cluster na nuvem (ex: MongoDB Atlas), permitindo escalabilidade.

## 4. Rearquitetura e Organização
*   **Separação Física:** O projeto foi dividido em duas pastas principais: `/backend` (API Node.js/Express) e `/frontend` (Interface Estática).
*   **CORS e Segurança:** Configuração do middleware CORS e ajustes em cookies de sessão (`SameSite: None`, `Secure: True`) para permitir comunicação segura entre domínios diferentes.
*   **Helper de Comunicação:** Criação do `js/config.js` com o método `apiFetch`, que centraliza a URL da API e automatiza o tratamento de JSON e credenciais.

## 5. Próximos Passos (Deploy)
*   As instruções detalhadas de como configurar a Vercel para apontar para as pastas `/backend` e `/frontend` estão disponíveis no arquivo `INSTRUCOES_MIGRACAO.md`.

---
**Status Atual:** Projeto refatorado, seguro e pronto para o ambiente de produção.
