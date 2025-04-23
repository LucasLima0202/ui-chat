// src/logic/sessionChatLogic.js
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'


const getOrCreateSessionId = () => {
  let id = localStorage.getItem('id_sessionchat')
  if (!id) {
    id = uuidv4()
    console.log('Novo session ID:', id)  // DEBUG: exibe o UUID gerado
    localStorage.setItem('id_sessionchat', id)
  }
  return id
}

export const sessionMessages = ref([])
export const id_sessionchat = getOrCreateSessionId()
