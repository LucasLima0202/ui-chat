


<template>
  <div>
      <!-- Wrapper do conteúdo que será "empurrado" -->
      <div class="main-wrapper" :class="{ pushed: isOpen }">
      <!-- Icone -->
      <!-- <div class="main-icon">
        <div class="hamburger" :class="{hiddenclose: isOpen}"  @click="toggleMenu(true)" data-toggle="tooltip" data-placement="top" title="Abrir menu">
          <i class="bi bi-layout-sidebar"></i>
        </div>
        <div class="new-chat" :class="{hiddenclose: isOpen}"  v-on:click="realodPage()"  data-toggle="tooltip" data-placement="top"  title="Novo Chat">
          <i class="bi bi-chat-left-dots"></i>
        </div>
      </div> -->
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
      
      <!-- Qualquer conteúdo da página pode ir aqui -->
      <div class="chat-container">
<Chatinterface :isSidebarOpen="isOpen" />
        <!-- <Alunostable /> -->
      </div>
    </div>

    <!-- Overlay da sidebar -->
    <div class="offcanvas-overlay" v-bind:class="{ on: isOpen }" @click="toggleMenu(false)"></div>

    <!-- Sidebar -->
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
import Alunostable from '../alunostable.vue';
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

  // if (stateToggle) {
  //   document.body.style.overflow = 'hidden'
  // } else {
  //   setTimeout(() => {
  //     document.body.style.overflow = ''
  //   }, 500)
  // }
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
.main-icon {
  position: fixed;
  top: 0.4rem;
  left: 1rem;
  z-index: 1001;
  padding: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
}
.n-navbar-control{
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.n-navbar-blank{
  width: 100%;
}
.p-button-text i{
  color: #494c4b;
  font-size: 1.1rem;
}
.p-button-tex-offcanvas{
    background-color: transparent;
  border: none;
  padding: 10px 15px;
  border-radius: 44px;
  color: #494c4b;
  background-color: #FFFFFF;
  border: solid 0.5px #eeeeee;
  font-size: 1.1rem;
  width: 100%;
  transition: all ease-in-out 0.3s !important;
}
.p-button-tex-offcanvas:hover{
  background-color: #E4E8EC !important;
    border: solid 0.5px #ffffff !important;
  color: #494c4b !important;
}

.p-button-text-offcanvas{
  background-color: transparent;
  border: none;
  padding: 15px 16px;
  list-style: none;
  border-radius: 14px;
  width: 100%;
  transition: all ease-in-out 0.2s;
  color: #494c4b;
  display: flex;
  justify-content: space-between;

}
.p-button-text-offcanvas span{
  font-size: 13.5px;
  font-weight: 600;
}

.p-button-text-offcanvas:hover{
  background-color: #E4E8EC !important;
  border: none !important;
  color: #494c4b !important;
}


.p-button-text{
  background-color: transparent;
  border: none;
  padding: 10px 15px;
  border-radius: 44px;
  width: 100%;
  transition: all ease-in-out 0.2s;
}

.p-button-text:hover{
  background-color: #E4E8EC !important;
  border: none !important;
  color: #494c4b;

}
.button-controler{
    display: none;
}
.button-controler.open{
  display: flex;
}


.cirlce-offcanvas{
  background-color:#E4E8EC;
  height: 60px;
  width: 60px;
  border-radius: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
}

.info-offcanvas{
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  margin: 0;
  padding: 0;
}
.info-offcanvas h6{
  padding: 0;
  margin: 0;
}
.toolbar-offcanvas{
  gap: 20px;
  justify-content: flex-start;
  border: none;
  background-color: transparent;
}
</style>