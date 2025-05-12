import axios from 'axios'

const API_BASE = 'http://localhost:PORT' 

// 1️⃣ Envia a pergunta do usuário
export const postUserQuestion = async (payload) => {
  return await axios.post(`${API_BASE}/questions`, payload)
}

// 2️⃣ Busca a resposta do backend usando UUID
export const getChatResponse = async (sessionId) => {
  return await axios.get(`${API_BASE}/responses/${sessionId}`)
}

// 3️⃣ Envia feedback de exibição
export const postFeedback = async (feedback) => {
  return await axios.post(`${API_BASE}/feedback`, feedback)
}
