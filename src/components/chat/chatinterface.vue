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

        <!-- Respostas do bot (com base no tipo da resposta) -->
        <template v-else>
          <!-- Mensagem simples -->
          <Message
            v-if="msg.typeOfMessage === 'message'"
            :text="msg.text"
            :sender="msg.sender"
            :loading="msg.loading"
            :title="msg.title"
          />

          <!-- Tabela -->
          <TableResponse
            v-else-if="msg.typeOfMessage === 'table'"
            :rows="msg.rows"
            :message="msg.text"
          />

          <!-- Lista -->
          <MessageList
            v-else-if="msg.typeOfMessage === 'list'"
            :items="msg.list"
            :title="msg.text"
          />

          <!-- Adicionar outros tipos de resposta -->
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
import Message from './type/message.vue'
import TableResponse from './type/tableresponse.vue'
import MessageList from './type/messagelist.vue'

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
