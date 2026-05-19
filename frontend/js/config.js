// Configuração global da API
// Em desenvolvimento (monolito), deixe vazio para usar a mesma origem.
// Em produção (separado), coloque a URL do seu backend na Vercel.
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? '' 
  : 'https://seu-backend-ecoscore.vercel.app';

// Helper para fetch com credenciais e parsing automático
async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
  
  options.credentials = 'include'; // Garante o envio de cookies/sessão
  
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    };
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ erro: 'Erro na comunicação com o servidor' }));
    const error = new Error(errorData.erro || 'Erro na requisição');
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  // Para endpoints que não retornam nada (204 No Content) ou retorno vazio
  if (response.status === 204) return null;

  return response.json().catch(() => response);
}
