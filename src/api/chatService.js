import axios from 'axios'

const API_BASE = 'http://localhost:PORT' 

export const postUserQuestion = async (payload) => {
  return await axios.post(`${API_BASE}/questions`, payload)
}

export const getChatResponse = async (sessionId) => {
  return await axios.get(`${API_BASE}/responses/${sessionId}`)
}

export const postFeedback = async (feedback) => {
  return await axios.post(`${API_BASE}/feedback`, feedback)
}
// por enqt nao estou usando estou conectando ele ah um node weebhook