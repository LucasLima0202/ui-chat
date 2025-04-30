import { ref, nextTick } from 'vue'
import Interacao from '@/api/interactionLogic'
import { sessionMessages, id_sessionchat } from './sessionChatLogic'

export function useChatLogic() {
  //--------------------------------------------------------------------------------------------------

  const input = ref('')
  const messages = ref([])
  const isSend = ref(false)
  const isThinking = ref(false)
  const messagesContainer = ref(null)

//--------------------------------------------------------------------------------------------------

  let messageIdCounter = 1
  let currentBotRequest = null
  let abortController = null 

//--------------------------------------------------------------------------------------------------

  const scrollToBottom = () => {
    nextTick(() => {
      const el = messagesContainer.value
      if (el) el.scrollTop = el.scrollHeight
    })
  }

//--------------------------------------------------------------------------------------------------

  const salvarSessaoNoLocalStorage = () => {
    localStorage.setItem('mensagens_sessao', JSON.stringify(sessionMessages.value))
  }

//--------------------------------------------------------------------------------------------------

  const sendMessage = async () => {
    const trimmed = input.value.trim()
    if (!trimmed || isThinking.value) return

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
  

    const botThinking = {
      text: '',
      sender: 'bot',
      loading: true,
      timestamp: new Date().toISOString()
    }


    messages.value.push(botThinking)
    isThinking.value = true
    scrollToBottom()

    try {
      abortController = new AbortController()
      currentBotRequest = Interacao.salvar(userPayload, { signal: abortController.signal })
      const response = await currentBotRequest
      const result = Array.isArray(response.data) ? response.data[0] : response.data

      console.log('Resposta do n8n:', result)

      messages.value = messages.value.filter(m => !m.loading)

      //typemssagecontext

      const type = result.typeOfMessage || result.typeofmessage || 'message'
      let parsedData = result.data
      if (typeof parsedData === 'string') {
        try {
          parsedData = JSON.parse(parsedData)
        } catch (err) {
          console.warn('Erro ao converter `data` para JSON:', err)
          parsedData = null
        }
      }

      const botPayload = {
        id_sessionchat: result.id_sessionchat || id_sessionchat,
        chatinput: '',
        timestamp: new Date().toISOString(),
        sender: result.sender === 'ai' ? 'bot' : result.sender,
        text: result.message || result.output || '',
        typeOfMessage: type,
        rows: type === 'table' || type === 'tablenavigation' ? parsedData : null,
        list: type === 'list' ? parsedData : null,
        item: type === 'singleItem' ? parsedData : null
      }

      sessionMessages.value.push(botPayload)
      messages.value.push({
        text: botPayload.text,
        sender: botPayload.sender,
        timestamp: botPayload.timestamp,
        typeOfMessage: botPayload.typeOfMessage,
        rows: botPayload.rows,
        list: botPayload.list,
        item: botPayload.item
      })

      scrollToBottom()
      salvarSessaoNoLocalStorage()
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('Requisição cancelada!')
      } else {
        console.error('Erro ao salvar na API:', error)

        messages.value = messages.value.filter(m => !m.loading)

        const fallback = {
          id_sessionchat,
          chatinput: '',
          timestamp: new Date().toISOString(),
          sender: 'bot',
          text: 'Desculpe, não consegui processar sua mensagem.' ,
          typeOfMessage: 'message'
        }

        sessionMessages.value.push(fallback)
        messages.value.push(fallback)
        scrollToBottom()
      }
    } finally {
      isThinking.value = false
      currentBotRequest = null
      abortController = null
    }
  }

  //--------------------------------------------------------------------------------------------------

  const interruptBot = () => {
    if (isThinking.value) {
      console.log('Interrompendo resposta do bot...')
      if (abortController) {
        abortController.abort()
      }

      messages.value = messages.value.filter(m => !m.loading)
      const interruptedMessage = {
        id_sessionchat,
        chatinput: '',
        timestamp: new Date().toISOString(),
        sender: 'bot',
        text: 'Resposta interrompida pelo usuário.',
        typeOfMessage: 'message'
      }
      sessionMessages.value.push(interruptedMessage)
      messages.value.push(interruptedMessage)

      isThinking.value = false
      currentBotRequest = null
      abortController = null

      scrollToBottom()
    }
  }

  return {
    input,
    messages,
    sessionMessages,
    isSend,
    isThinking,
    messagesContainer,
    id_sessionchat,
    sendMessage,
    scrollToBottom,
    salvarSessaoNoLocalStorage,
    interruptBot
  }
}
