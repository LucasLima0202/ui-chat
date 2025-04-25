import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:5678/webhook-test/interface-vue', 
  headers: {
    'Content-Type': 'application/json'
  }
})