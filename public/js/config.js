// Configuração global da API (Unificada)
// Agora o frontend e o backend rodam no mesmo endereço.
window.API_URL = window.location.origin;

// Helper para fetch com credenciais e parsing automático
window.apiFetch = async function apiFetch(endpoint, options = {}) {
  // Garante que o endpoint use o domínio atual
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${window.API_URL}${path}`;

  // Envia cookies da sessão automaticamente
  options.credentials = "include"; 
  
  options.headers = {
    "Accept": "application/json",
    ...options.headers,
  };

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

    // Se a sessão cair, manda para o login de forma amigável
    if (response.status === 401 || response.status === 403) {
      const isAuthPage = window.location.pathname.includes("login.html") || 
                        window.location.pathname.includes("index.html") || 
                        window.location.pathname === "/";
                        
      if (!isAuthPage) {
        console.warn("🔒 Sessão expirada. Redirecionando...");
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
    console.error(`❌ Falha na API [${endpoint}]:`, err.message);
    throw err;
  }
};
