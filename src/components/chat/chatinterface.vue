<template>
<div class="chat-interface" :class="{ 'active-chat': isSend, 'sidebar-open': isSidebarOpen }">
  <div class="chat-wrapper" :class="{ 'initial-center': !isSend, 'sidebar-open': isSidebarOpen  }">
      <div class="chat-messages" ref="messagesContainer" :class="{'initial-center': !isSend}">
        <h1 v-if="!isSend" class="welcome">{{ getCurrentTimeAsText() }}, sou seu assistente <br>de consulta, em que posso ajudar?</h1>

        <template v-for="(msg, idx) in messages" :key="idx">
          <Message
            v-if="msg.sender === 'user'"
            :text="msg.text"
            sender="user"
          />
          <Message
            v-else-if="msg.loading"
            :loading="true"
            :sender="'bot'"
          />
          <template v-else>
            <Message
              class="chat-p"
              v-if="msg.typeOfMessage === 'message'"
              :text="msg.text"
              :sender="msg.sender"
              :loading="msg.loading"
              :title="msg.title"
            />
            <MessageList
              class="chat-p"
              v-else-if="msg.typeOfMessage === 'list'"
              :items="msg.list || msg.data"
              :title="msg.title || msg.text"
            />
            <MessageCard
              class="chat-p"
              v-else-if="msg.typeOfMessage === 'singleItem'"
              :title="msg.text"
              :text="msg.text"
            />
            <TableMessage
              class="chat-p"
              v-else-if="msg.typeOfMessage === 'table' && msg.rows && msg.rows.length <= 15"
              :rows="msg.rows"
              :title="msg.title"
              :message="msg.text"
              :suggestion="msg.suggestion"
            />
            <TableNavigation
              class="chat-p"
              v-else-if="(msg.typeOfMessage === 'table' && msg.rows && msg.rows.length > 15) || msg.typeOfMessage === 'tablenavigation'"
              :rows="msg.rows"
              :message="msg.text"
              :title="msg.title"
            />
          </template>
        </template>
      </div>
      
      <section  class="chat-input"
      :class="{ 'fixed-input': isSend ,'sidebar-open': isSidebarOpen  }">
      <form
        class="chat-controler"
        :class="{ 'fixed-input': isSend ,'sidebar-open': isSidebarOpen  }"
        @submit.prevent="sendMessage"
      >

      <textarea
        ref="textarea"
        v-model="input"
        class="chat-textarea"
        placeholder="Digite sua mensagem..."
        :disabled="isThinking"
        @input="resizeWithHiddenDiv"
         @keydown="handleKeydown"
      ></textarea>
    
        <button
          v-if="isThinking"
          @click="interruptBot"
          class="interrupt-button"
          type="button"
        >
          <i class="bi bi-stop-fill"></i>
        </button>
        <button v-else type="submit">
          <i class="bi bi-send"></i>
        </button>
      </form>
      <div class="text-center"  :class="{ 'initial-display': !isSend, 'sidebar-open': isSidebarOpen   }">
        <span>
          O Agente AI pode cometer erros. Considere verificar informações importantes.
        </span>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useChatLogic } from '@/logic/useChatLogic'

// Componentes
import Message from './type/message.vue'
import MessageList from './type/messagelist.vue'
import TableMessage from './type/variation/tb-response-box.vue'
import TableNavigation from './type/variation/tb-navigation-box.vue'
import MessageCard from './type/cardmessage.vue'
import { InputText } from 'primevue'
import Loader from '../additional/dotflashing.vue'


function getCurrentTimeAsText() {
const today = new Date();
const date = today.getHours();
let dateTime = '';
  if (date < 12) {
    dateTime = 'Bom dia'
} else if (date < 18) {
  dateTime='Boa Tarde'
} else {
  dateTime='Boa Noite'
}
return dateTime

}
  
const inputy = ref('')
const textarea = ref(null)
let hiddenDiv = null
function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
function resizeWithHiddenDiv() {
  const el = textarea.value
  if (!el) return

  if (!hiddenDiv) {
    hiddenDiv = document.createElement('div')
    document.body.appendChild(hiddenDiv)
    hiddenDiv.style.position = 'absolute'
    hiddenDiv.style.top = '-9999px'
    hiddenDiv.style.left = '-9999px'
    hiddenDiv.style.zIndex = '-1000'
    hiddenDiv.style.whiteSpace = 'pre-wrap'
    hiddenDiv.style.wordWrap = 'break-word'
    hiddenDiv.style.visibility = 'hidden'
    hiddenDiv.style.padding = '12px 16px'
    hiddenDiv.style.lineHeight = '1.5'
    hiddenDiv.style.fontSize = '15px'
    hiddenDiv.style.fontFamily = 'Arial, sans-serif'
    hiddenDiv.style.width = getComputedStyle(el).width
    hiddenDiv.style.boxSizing = 'border-box'
  }

  const content = el.value.replace(/\n/g, '<br>') + '<br style="line-height: 3px;">'
  hiddenDiv.innerHTML = content

  const newHeight = hiddenDiv.offsetHeight
  const maxHeight = 100
  const finalHeight = Math.min(newHeight, maxHeight)

  el.style.height = `${finalHeight}px`
  el.style.overflowY = newHeight > maxHeight ? 'auto' : 'hidden'
}

onMounted(() => {
  resizeWithHiddenDiv()
})
defineProps({
  isSidebarOpen: Boolean
})
// Estado e lógica principal
const {
  input,
  messages,
  isSend,
  isThinking,
  messagesContainer,
  sendMessage,
  interruptBot,
  resetTextarea
} = useChatLogic()


watch(messages, async () => {
  await nextTick()
  const el = messagesContainer.value
  if (el) {
    el.scrollTop = el.scrollHeight
  }
})
</script>


<style scoped>
@import '../style/chatinterface.css';

</style>
