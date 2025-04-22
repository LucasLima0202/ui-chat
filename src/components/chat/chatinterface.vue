<template>
    <div class="chat-interface" :class="{ send: isSend }">
      <div class="chat-messages" ref="messagesContainer">
        <!-- Mensagem inicial (some após o primeiro envio) -->
        <h1 v-if="!isSend" class="welcome">Em que posso ajudar</h1>
  
        <Message
          v-for="(msg, index) in messages"
          :key="index"
          :text="msg.text"
          :sender="msg.sender"
        />
      </div>
  
      <div class="chat-input">
        <input
          type="text"
          v-model="input"
          @keyup.enter="sendMessage"
          placeholder="Digite sua mensagem..."
        />
        <button @click="sendMessage"><i class="bi bi-send"></i></button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, nextTick } from 'vue'
  import Message from './message.vue'
  
  const input = ref('')
  const messages = ref([])
  const isSend = ref(false) // <- flag que controla se a primeira mensagem foi enviada
  const messagesContainer = ref(null)
  
  function sendMessage() {
    const trimmed = input.value.trim()
    if (!trimmed) return
  
    // Quando enviar a primeira mensagem, ativa o estado "send"
    if (!isSend.value) {
      isSend.value = true
    }
  
    messages.value.push({ text: trimmed, sender: 'user' })
    input.value = ''
  
    // Simula resposta do "bot"
    setTimeout(() => {
      messages.value.push({ text: 'Simulação de resposta do bot!', sender: 'bot' })
      scrollToBottom()
    }, 800)
  
    scrollToBottom()
  }
  
  function scrollToBottom() {
    nextTick(() => {
      const el = messagesContainer.value
      if (el) el.scrollTop = el.scrollHeight
    })
  }
  </script>
  
  
  <style scoped>
    @import '../style/chatinterface.css';
  </style>
  