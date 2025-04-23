// src/logic/useChatLogic.js
import { ref, nextTick } from 'vue'
import responseAI from '@/json/sample.json'
import { sessionMessages, id_sessionchat } from './sessionChatLogic'

/**
 * Composable que encapsula toda a lógica do chat
 */
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

  const sendMessage = () => {
    const trimmed = input.value.trim()
    if (!trimmed) return

    if (!isSend.value) {
      isSend.value = true
    }

    const timestamp = new Date().toISOString()

    // Payload da mensagem do usuário
    const userPayload = {
      id_sessionchat,      // UUID garantido por sessionChatLogic.js
      chatinput: trimmed,
      timestamp,
      sender: 'user',
    }

    // Armazena na sessão e exibe no chat
    sessionMessages.value.push(userPayload)
    messages.value.push({ text: trimmed, sender: 'user', timestamp })
    input.value = ''
    scrollToBottom()

    console.log('Mensagem enviada:', JSON.stringify(userPayload, null, 2))

    // Simula delay e gera resposta do bot a partir do JSON
    setTimeout(() => {
      const respostaData = responseAI.data
        .map((item, index) => {
          const campos = Object.entries(item)
            .map(([key, value]) => `• ${key}: ${value || 'Não informado'}`)
            .join('\n')
          return `Registro ${index + 1}:\n${campos}`
        })
        .join('\n\n')

      const botPayload = {
        id_sessionchat,
        chatinput: respostaData,
        timestamp: new Date().toISOString(),
        sender: 'bot',
      }

      sessionMessages.value.push(botPayload)
      messages.value.push({ text: respostaData, sender: 'bot', timestamp: botPayload.timestamp })
      scrollToBottom()
      salvarSessaoNoLocalStorage()
    }, 800)
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
