<template>
  <div class="chat-interface" :class="{ send: isSend }">
    <div class="chat-messages" ref="messagesContainer">
      <h1 v-if="!isSend" class="welcome">Em que posso ajudar?</h1>

      <template v-for="(msg, idx) in messages" :key="idx">
        <!-- Mensagem enviada pelo usuário -->
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

        <!-- Resposta do bot -->
        <template v-else>
          <!-- Mensagem padrão -->
          <Message
            v-if="msg.typeOfMessage === 'message'"
            :text="msg.text"
            :sender="msg.sender"
            :loading="msg.loading"
            :title="msg.title"
          />

          <!-- Lista -->
          <MessageList
            v-else-if="msg.typeOfMessage === 'list'"
            :items="msg.list"
            :title="msg.text"
          />
          <!-- Tabela normal (até 15 linhas) -->
          <TableMessage
            v-else-if="msg.typeOfMessage === 'table' && msg.rows && msg.rows.length <= 15"
            :rows="msg.rows"
            :title="msg.title"
            :message="msg.text"
          />

          <!-- Tabela grande com paginação -->
          <TableNavigation
            v-else-if="(msg.typeOfMessage === 'table' && msg.rows && msg.rows.length > 15) || msg.typeOfMessage === 'tablenavigation'"
            :rows="msg.rows"
            :message="msg.text"
          />
        </template>
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
          <i class="bi bi-stop-fill"></i>
        </button>
        <button v-else type="submit">
          <i class="bi bi-send"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useChatLogic } from '@/logic/useChatLogic'

import Message from './type/message.vue'
import MessageList from './type/messagelist.vue'
import TableMessage from './type/tableresponse.vue'
import TableNavigation from './type/tablenavigation.vue'

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
