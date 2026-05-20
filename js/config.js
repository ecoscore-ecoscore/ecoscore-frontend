// Configuração global da API
// Sempre usar o backend no Vercel
const API_URL = "https://ecoscore-backend.vercel.app";

// Helper para fetch com credenciais e parsing automático
async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

  options.credentials = "include"; // Garante o envio de cookies/sessão

  if (
    options.body &&
    typeof options.body === "object" &&
    !(options.body instanceof FormData)
  ) {
    options.body = JSON.stringify(options.body);
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ erro: "Erro na comunicação com o servidor" }));
    const error = new Error(errorData.erro || "Erro na requisição");
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  // Para endpoints que não retornam nada (204 No Content) ou retorno vazio
  if (response.status === 204) return null;

  return response.json().catch(() => response);
}
