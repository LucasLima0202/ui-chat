// src/api/config.js
import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:5678/webhook/interface-vue', // 👈 DIRETO NO N8N
  headers: {
    'Content-Type': 'application/json'
  }
})
