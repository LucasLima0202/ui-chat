<template>
  <div class="chat-interface" :class="{ send: isSend }">
    <div class="chat-messages" ref="messagesContainer">
      <h1 v-if="!isSend" class="welcome">Em que posso ajudar?</h1>

      <template v-for="(msg, idx) in messages" :key="idx">
        <!-- mensagem do usuário -->
        <Message
          v-if="msg.sender === 'user'"
          :text="msg.text"
          sender="user"
        />

        <!-- resposta do bot: se tem rows, usa a tabela -->
        <TableResponse
          v-else-if="msg.rows"
          :rows="msg.rows"
        />

        <!-- fallback textual para bot sem rows -->
        <Message
          v-else
          :text="msg.text"
          sender="bot"
        />
      </template>
    </div>

    <div class="chat-input">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        placeholder="Digite sua mensagem..."
      />
      <button @click="sendMessage"><i class="bi bi-send"></i></button>
    </div>
  </div>
</template>
<script setup>
import { useChatLogic } from '@/logic/useChatLogic'
import Message from './message.vue'
import TableResponse from './tableresponse.vue'

const {
  input,
  messages,
  isSend,
  messagesContainer,
  sendMessage
} = useChatLogic()
</script>
  
  
  <style scoped>
    @import '../style/chatinterface.css';
  </style>
  