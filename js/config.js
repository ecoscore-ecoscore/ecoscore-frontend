// Configuração global da API
// Sempre usar o backend no Vercel (ou localhost se for o caso)
window.API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:3000"
  : "https://ecoscore-backend.vercel.app";

// Helper para fetch com credenciais e parsing automático
window.apiFetch = async function apiFetch(endpoint, options = {}) {
  // Se o endpoint for relativo, anexa a API_URL
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${window.API_URL}${endpoint}`;

  // Configurações padrão para garantir envio de cookies/sessão
  options.credentials = "include"; 
  
  // Headers padrão
  options.headers = {
    "Accept": "application/json",
    ...options.headers,
  };

  // Se houver corpo e for objeto, converte para JSON
  if (
    options.body &&
    typeof options.body === "object" &&
    !(options.body instanceof FormData)
  ) {
    options.body = JSON.stringify(options.body);
    options.headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, options);

    // Tratamento de erro 401/403 (Sessão expirada)
    if (response.status === 401 || response.status === 403) {
      console.warn("⚠️ Sessão inválida ou expirada.");
      // Só redireciona se não estiver já na login.html
      if (!window.location.pathname.includes("login.html") && !window.location.pathname.includes("index.html") && window.location.pathname !== "/") {
        window.location.href = "/login.html";
        return;
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.erro || errorData.mensagem || "Erro na requisição");
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (err) {
    console.error(`❌ Erro no apiFetch [${endpoint}]:`, err.message);
    throw err;
  }
};
