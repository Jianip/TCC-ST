export const modoDemo = import.meta.env.VITE_MODO_API !== "real";

export async function api<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  if (modoDemo) {
    const { respostaMock } = await import("./mock");
    return respostaMock(path, method, body) as T;
  }
  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      method, credentials: "same-origin",
      headers: method === "GET" ? {} : { "Content-Type": "application/json" },
      body: method === "GET" ? undefined : JSON.stringify(body ?? {}),
    });
  } catch { throw new Error("Não foi possível conectar ao servidor. Tente novamente."); }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401 && !path.startsWith("/auth/")) window.dispatchEvent(new Event("sessao-expirada"));
    throw new Error(data?.mensagem || "Não foi possível concluir a operação.");
  }
  if (data === null) throw new Error("Resposta inválida da API. Confira a configuração do servidor.");
  return data as T;
}
export function mensagemErro(error: unknown) {
  return error instanceof Error ? error.message : "Não foi possível concluir a operação.";
}
export function lerPreferencia(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}
export function salvarPreferencia(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Preferência continua válida nesta sessão. */ }
}
