


<template>
  <div>
      <!-- Wrapper do conteúdo que será "empurrado" -->
      <div class="main-wrapper" :class="{ pushed: isOpen }">
      <!-- Icone -->
      <div class="main-icon">
        <div class="hamburger" :class="{hiddenclose: isOpen}"  @click="toggleMenu(true)" data-toggle="tooltip" data-placement="top" title="Abrir menu">
          <i class="bi bi-layout-sidebar"></i>
        </div>
        <div class="new-chat" :class="{hiddenclose: isOpen}"  v-on:click="realodPage()"  data-toggle="tooltip" data-placement="top"  title="Novo Chat">
          <i class="bi bi-chat-left-dots"></i>
        </div>
      </div>
      
      <!-- Qualquer conteúdo da página pode ir aqui -->
      <div class="chat-container">
        <Chatinterface></Chatinterface>
      </div>
    </div>

    <!-- Overlay da sidebar -->
    <div class="offcanvas-overlay" v-bind:class="{ on: isOpen }" @click="toggleMenu(false)"></div>

    <!-- Sidebar -->
    <div class="nav-offcanvas" v-bind:class="{ open: isOpen }">
      <div class="button-controler">
        <button class="close" v-on:click="toggleMenu(false)" data-toggle="tooltip" data-placement="top" title="Fechar menu">
        <i class="bi bi-layout-sidebar"></i>
        </button>
        <button class="close" v-on:click="realodPage()" data-toggle="tooltip" data-placement="top" title="Novo Chat">
          <i class="bi bi-chat-left-dots"></i>
      </button>
      </div>
    
      <nav class="nav-offcanvas-menu">
        <ul class="container-list"> 
          <SessionCard
            v-for="session in state.sessions"
            :key="session.id"
            :session="session"
            :isOpen="activeDropdownId === session.id"
            @select="handleSessionSelect"
            @toggle="handleToggleDropdown"
            @close="handleCloseDropdown"
          />
        </ul>
      </nav>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import SessionCard from '../session/sessioncard.vue';
import Chatinterface from '../chat/chatinterface.vue'
  const state = reactive({
  sessions: [
    { id: 1, title: 'Explorando Vue 3', data: '04-22-25' },
    { id: 2, title: 'ChatGPT com API', data: '04-21-25' },
    { id: 3, title: 'Componentes Dinâmicos', data: '03-29-25' },
  ],
  nextId: 4
})


const isOpen = ref(false)
const activeDropdownId = ref(null)

function toggleMenu(stateToggle) {
  isOpen.value = stateToggle

  if (stateToggle) {
    document.body.style.overflow = 'hidden'
  } else {
    setTimeout(() => {
      document.body.style.overflow = ''
    }, 500)
  }
}

function addNewChat() {
  state.sessions.push({
    id: state.nextId,
    title: `Nova Sessão ${state.nextId}`
  })
  state.nextId++
}

function realodPage(){
  location.reload();
}

function handleSessionSelect(id) {
  console.log('Sessão selecionada:', id)
}
function handleToggleDropdown(id) {
  activeDropdownId.value = activeDropdownId.value === id ? null : id
}

function handleCloseDropdown() {
  activeDropdownId.value = null
}
</script>


<style scoped>
@import '../style/sidebar.style.css'; 
</style>