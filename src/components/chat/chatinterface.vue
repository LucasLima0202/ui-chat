<template>
<div class="chat-interface" :class="{ 'active-chat': isSend, 'sidebar-open': isSidebarOpen }">
  <div class="chat-wrapper" :class="{ 'initial-center': !isSend, 'sidebar-open': isSidebarOpen  }">
      <div class="chat-messages" ref="messagesContainer">
        <h1 v-if="!isSend" class="welcome">Em que posso ajudar?</h1>
        <!-- <TabelaMockada /> -->
         <!-- <TabelaMockadaColored/> -->
          <TabelaMockadaNavigation />
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
              :items="msg.list"
              :title="msg.text"
              :text="msg.text"
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
          <InputText   
          id="in_label" 
          v-model="input"
          :disabled="isThinking" 
          placeholder="Digite sua mensagem..."
          autocomplete="off" />
    
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
import TableMessage from './type/tableresponse.vue'
import TableNavigation from './type/tablenavigation.vue'
import MessageCard from './type/cardmessage.vue'
import { InputText } from 'primevue'
import TabelaMockada from './type/variation/tb-response-box.vue'
import TabelaMockadaColored from './type/variation/tablecolored.style.vue'
import TabelaMockadaNavigation from './type/variation/tb-navigation-box.vue'
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
  interruptBot
} = useChatLogic()
</script>


<style scoped>
@import '../style/chatinterface.css';

</style>
