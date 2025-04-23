<template>
    <div class="chat-interface" :class="{ send: isSend }">
      <div class="chat-messages" ref="messagesContainer">
        <!-- Mensagem inicial (some após o primeiro envio) sumira apos Send for ativado -->
        <h1 v-if="!isSend" class="welcome">Em que posso ajudar ?</h1>
  
        <Message
          v-for="(msg, index) in messages"
          :key="index"
          :text="msg.text"
          :sender="msg.sender"
        />
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
  