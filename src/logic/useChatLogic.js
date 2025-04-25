// src/logic/useChatLogic.js
import { ref, nextTick } from 'vue'
import Interacao from '@/api/interactionLogic'
import { sessionMessages, id_sessionchat } from './sessionChatLogic'

export function useChatLogic() {
  const input = ref('')
  const messages = ref([])
  const isSend = ref(false)
  const messagesContainer = ref(null)

  // mandar a mensagem para baixo
  const scrollToBottom = () => {
    nextTick(() => {
      const el = messagesContainer.value
      if (el) el.scrollTop = el.scrollHeight
    })
  }

  // salvar a mensagem no localstorage
  const salvarSessaoNoLocalStorage = () => {
    localStorage.setItem('mensagens_sessao', JSON.stringify(sessionMessages.value))
  }

 //decalrando um o id_messagechat e embaixo icrementando ++ a cada mensagem enviada pelo usuario
  let messageIdCounter = 1

  // funcao principal
  const sendMessage = async () => {

    const trimmed = input.value.trim()
    if (!trimmed) return
  
    if (!isSend.value) {
      isSend.value = true
    }
  
    const timestamp = new Date().toISOString()
  
    const userPayload = {
      id_sessionchat,
      id_messagechat: messageIdCounter++,
      chatinput: trimmed,
      timestamp,
      sender: 'user',
    }
  
    console.log('Mensagem enviada:', JSON.stringify(userPayload, null, 2))
  
    sessionMessages.value.push(userPayload)
    messages.value.push({ text: trimmed, sender: 'user', timestamp })
    input.value = ''
    scrollToBottom()
  
    //insere o loader do chat antes do await
    const botThinking = {
      text: '',
      sender: 'bot',
      loading: true,
      timestamp: new Date().toISOString()
    }
    messages.value.push(botThinking)
    scrollToBottom()
  
    try {
      const response = await Interacao.salvar(userPayload)
      const result = Array.isArray(response.data) ? response.data[0] : response.data
      console.log('Resposta do n8n:', result)
  
      // remove o loader assim que chega a resposta
      messages.value = messages.value.filter(m => !m.loading)
  
      const botPayload = {
        id_sessionchat: result.body?.id_sessionchat || id_sessionchat,
        chatinput: '',
        timestamp: new Date().toISOString(),
        sender: result.sender === 'ai' ? 'bot' : result.sender,
        text: result.output
      }
  
      sessionMessages.value.push(botPayload)
      messages.value.push({
        text: botPayload.text,
        sender: botPayload.sender,
        timestamp: botPayload.timestamp
      })
  
      scrollToBottom()
      salvarSessaoNoLocalStorage()
    } catch (error) {
      console.error('Erro ao salvar na API:', error)
  
      messages.value = messages.value.filter(m => !m.loading) // remove também o loader em caso de erro
  
      const fallback = {
        id_sessionchat,
        chatinput: '',
        timestamp: new Date().toISOString(),
        sender: 'bot',
        text: 'Desculpe, não consegui processar sua mensagem.'
      }
  
      sessionMessages.value.push(fallback)
      messages.value.push(fallback)
      scrollToBottom()
    }
  }
  

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
