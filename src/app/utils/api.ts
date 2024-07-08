const VITE_API_URL = import.meta.env.VITE_API_URL

export function api(path: string, init?: RequestInit) {
  const baseUrl = VITE_API_URL
  const url = new URL(path, baseUrl)

  return fetch(url, init)
}
