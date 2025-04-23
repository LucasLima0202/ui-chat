


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
    { id: 4, title: 'Vue Router Avançado', data: '04-20-25' },
    { id: 5, title: 'Gerenciamento de Estado com Pinia', data: '04-19-25' },
    { id: 6, title: 'Introdução ao Vite', data: '04-18-25' },
    { id: 7, title: 'Transições com Vue', data: '04-17-25' },
    { id: 8, title: 'Formulários Reativos', data: '04-16-25' },
    { id: 9, title: 'APIs REST com Axios', data: '04-15-25' },
    { id: 10, title: 'Reatividade Profunda', data: '04-14-25' },
    { id: 11, title: 'Slots no Vue', data: '04-13-25' },
    { id: 12, title: 'Composição vs Options API', data: '04-12-25' },
    { id: 13, title: 'Vuex vs Pinia', data: '04-11-25' },
    { id: 14, title: 'Testes com Vitest', data: '04-10-25' },
    { id: 15, title: 'Deploy com Netlify', data: '04-09-25' },
    { id: 16, title: 'Vue e TailwindCSS', data: '04-08-25' },
    { id: 17, title: 'Consumindo GraphQL', data: '04-07-25' },
    { id: 18, title: 'Vue no Mobile', data: '04-06-25' },
    { id: 19, title: 'Mixins e Reutilização', data: '04-05-25' },
    { id: 20, title: 'Lazy Loading de Componentes', data: '04-04-25' },
    { id: 21, title: 'Vue e Firebase', data: '04-03-25' },
    { id: 22, title: 'Boas práticas com Vue', data: '04-02-25' },
    { id: 23, title: 'Animações com VueUse', data: '04-01-25' },
    { id: 24, title: 'Vue 3 em Projetos Reais', data: '03-31-25' },
    { id: 25, title: 'Vue CLI vs Vite', data: '03-30-25' },
    { id: 26, title: 'Hooks personalizados', data: '03-28-25' },
    { id: 27, title: 'Organização de Pastas', data: '03-27-25' },
    { id: 28, title: 'Refatoração com Composables', data: '03-26-25' },
    { id: 29, title: 'Autenticação com JWT', data: '03-25-25' },
    { id: 30, title: 'Vue e CMS Headless', data: '03-24-25' },
    { id: 31, title: 'Padrões de Projeto no Vue', data: '03-23-25' },
    { id: 32, title: 'Vue e WebSockets', data: '03-22-25' },
    { id: 33, title: 'Vue e Mapas', data: '03-21-25' },
    { id: 34, title: 'Internacionalização com i18n', data: '03-20-25' },
    { id: 35, title: 'Performance com Suspense', data: '03-19-25' },
    { id: 36, title: 'Vue 3 e SSR', data: '03-18-25' },
    { id: 37, title: 'Custom Directives', data: '03-17-25' },
    { id: 38, title: 'Plugins no Vue 3', data: '03-16-25' },
    { id: 39, title: 'Vue em Ambientes Corporativos', data: '03-15-25' },
    { id: 40, title: '40 Vue na Prática', data: '03-14-25' },
    { id: 41, title: '41 Vue na Prática', data: '03-14-25' }
  ],
  nextId: 42
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