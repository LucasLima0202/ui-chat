<template>
  <div class="chat-interface" :class="{ send: isSend }">
    <div class="chat-messages" ref="messagesContainer">
      
      <h1 v-if="!isSend" class="welcome">Em que posso ajudar?</h1>

      <template v-for="(msg, idx) in messages" :key="idx">
        <Message
          v-if="msg.sender === 'user'"
          :text="msg.text"
          sender="user"
        />
        <Message
          v-else
          :text="msg.text"
          :sender="msg.sender"
          :loading="msg.loading"
        />
        <TableResponse
          v-if="msg.rows && msg.rows.length > 0"
          :rows="msg.rows"
          :message="msg.text"
        />
      </template>
    </div>

    <div>
      <form @submit.prevent="sendMessage" class="chat-input">
        <input
          v-model="input"
          :disabled="isThinking"
          placeholder="Digite sua mensagem..."
        />
        <button
          v-if="isThinking"
          @click="interruptBot"
          class="interrupt-button"
          type="button"
        >
        <i class="bi bi-stop-fill"></i> <!-- Ícone de stop -->
      </button>
      <button
        v-else
        type="submit"
      >
        <i class="bi bi-send"></i> <!-- Ícone de send -->
      </button>
    </form>
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
  isThinking,
  messagesContainer,
  sendMessage,
  interruptBot
} = useChatLogic()
</script>

<style scoped>
@import '../style/chatinterface.css';

</style>
