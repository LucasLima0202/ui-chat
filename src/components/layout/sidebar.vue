


<template>
  <div>
      <!-- Wrapper do conteúdo que será "empurrado" -->
      <div class="main-wrapper" :class="{ pushed: isOpen }">
      <nav class="main-icon">
      <div class="n-navbar-control">
        <Button class="p-button-text" :class="{hiddenclose: isOpen}" @click="toggleMenu(true)" data-toggle="tooltip" data-placement="top" title="Abrir menu">          
          <i class="bi bi-layout-sidebar"></i>
        </Button>
        <Button class="p-button-text" :class="{hiddenclose: isOpen}"  v-on:click="realodPage()"  data-toggle="tooltip" data-placement="top"  title="Novo Chat" >
          <i class="bi bi-chat-left-dots"></i>
        </Button>
      </div>
      <div class="n-navbar-blank">
      </div>
    </nav>

      <div class="chat-container">
  <Chatinterface :isSidebarOpen="isOpen" />

      </div>
    </div>

    <div class="offcanvas-overlay" v-bind:class="{ on: isOpen }" @click="toggleMenu(false)"></div>

    <div class="nav-offcanvas" v-bind:class="{ open: isOpen }">
      
       <section class="headear-offcanvas">

          <Toolbar 
          class="toolbar-offcanvas"
          >
            <template #start>
                <div class="cirlce-offcanvas">ATB</div>
            </template>

            <template #center>
                <div class="info-offcanvas">
                    <h6>Usuário</h6>
                    <span>Escola</span>
                </div>
            </template>
        
          </Toolbar>

       </section>

       <div class="button-controler" v-bind:class="{ 'open': isOpen }">
        <Button class="p-button-tex-offcanvas" :class="{hiddenclose: isOpen}" @click="toggleMenu(false)" data-toggle="tooltip" data-placement="top" title="Fechar menu">          
         <i class="bi bi-layout-sidebar"></i>
        </Button>

      </div>
    
      <nav class="nav-offcanvas-menu">
        <ul class="container-list"> 
          <section class="controler-menu">
             <Button class="p-button-text-offcanvas" :class="{hiddenclose: isOpen}"  v-on:click="realodPage()"  >
                 <span>Novo chat</span><i class="bi bi-chat-left-dots"></i>
            </Button>
          </section>
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
import { Toolbar } from 'primevue';

  const state = reactive({
  sessions: [
    { id: 1, title: 'Explorando Vue 3', data: '04-30-25' },
    { id: 2, title: 'ChatGPT com API', data: '04-21-25' },
    { id: 3, title: 'Componentes Dinâmicos', data: '03-29-25' },
  ],
  nextId: 4
})


const isOpen = ref(false)
const activeDropdownId = ref(null)

function toggleMenu(stateToggle) {
  isOpen.value = stateToggle
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