// src/logic/useChatLogic.js
import { ref, nextTick } from 'vue'

import { sessionMessages, id_sessionchat } from './sessionChatLogic'
import { mapMensagemParaArquivo } from './messageJsonLogic'

export function useChatLogic() {
  const input = ref('')
  const messages = ref([])
  const isSend = ref(false)
  const messagesContainer = ref(null)

  const scrollToBottom = () => {
    nextTick(() => {
      const el = messagesContainer.value
      if (el) el.scrollTop = el.scrollHeight
    })
  }

  const salvarSessaoNoLocalStorage = () => {
    localStorage.setItem('mensagens_sessao', JSON.stringify(sessionMessages.value))
  }

  const sendMessage = async () => {
    
    const trimmed = input.value.trim()
    if (!trimmed) return
  
    if (!isSend.value) {
      isSend.value = true
    }
  
    const timestamp = new Date().toISOString()
  
    const userPayload = {
      id_sessionchat,
      chatinput: trimmed,
      timestamp,
      sender: 'user',
    }
    console.log('Mensagem enviada:', JSON.stringify(userPayload, null, 2))

    sessionMessages.value.push(userPayload)
    messages.value.push({ text: trimmed, sender: 'user', timestamp })
    input.value = ''
    scrollToBottom()
  
    const arquivoJson = mapMensagemParaArquivo(trimmed)
    if (!arquivoJson) {
      const fallback = {
        id_sessionchat,
        chatinput: '',
        timestamp: new Date().toISOString(),
        sender: 'bot',
        text: 'Desculpe, não entendi sua pergunta. Tente algo como "Liste todas as turmas".'
      }
      sessionMessages.value.push(fallback)
      messages.value.push(fallback)
      scrollToBottom()
      return
    }
  
    const response = await fetch(`/src/json/${arquivoJson}`)
    const responseAI = await response.json()

    console.log('Resposta da IA:', responseAI)


    setTimeout(() => {
      const rows = Array.isArray(responseAI?.data) ? responseAI.data : []
      const message = responseAI?.message ?? 'Aqui está o que encontrei:'
      const botPayload = {
        id_sessionchat,
        chatinput: '',
        timestamp: new Date().toISOString(),
        sender: 'bot',
        rows,
        message
      }
  
      sessionMessages.value.push(botPayload)
      messages.value.push({
        text: '',
        sender: 'bot',
        timestamp: botPayload.timestamp,
        rows,
        message 
      })
  
      scrollToBottom()
      salvarSessaoNoLocalStorage()
    }, 800)
  }
  
    // setTimeout(() => {

    //     const rows = responseAI.data
    
    //     const botPayload = {
    //       id_sessionchat,
    //       chatinput: '',      // opcional: pode deixar em branco
    //       timestamp: new Date().toISOString(),
    //       sender: 'bot',
    //       rows                // <–– adiciona o array original
    //     }
    
    //     sessionMessages.value.push(botPayload)
    //     // agora você leva junto o rows para a UI
    //     messages.value.push({
    //       text: '',          // ou mensagem genérica
    //       sender: 'bot',
    //       timestamp: botPayload.timestamp,
    //       rows               // <–– adiciona aqui também
    //     })
    //     scrollToBottom()
    //     salvarSessaoNoLocalStorage()
    //   }, 800)
    // 
    
    return {
        input,
        messages,
        sessionMessages,
        isSend,
        messagesContainer,
        id_sessionchat,
        sendMessage,
        scrollToBottom,
        salvarSessaoNoLocalStorage,
      }

    }


    
