<template>
    <section class="session">
      <div class="linediv">
        <h6 class="session-data-title">{{ formatarDataPersonalizada(session.data) }}</h6>
      </div>
  
      <li class="session-card">
        <span class="session-title" @click="$emit('select', session.id)">
          {{ session.title }}
        </span>
  
        <div class="dropdown" ref="dropdownRef">
          <button
            class="btn btn-hover"
            ref="dropdownButtonRef"
            @click.stop="toggleDropdown"
          >
            <i class="bi bi-three-dots"></i>
          </button>
  
          <Teleport to="body">
            <ul
              v-if="isOpen"
              class="dropdown-menu-custom"
              :style="dropdownStyle"
              @click.stop
            >
              <li class="dropdown-item" @click="handleAction('action')">Action</li>
              <li class="dropdown-item" @click="handleAction('delete')">Delete</li>
            </ul>
          </Teleport>
        </div>
      </li>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  // Props e emits
  const props = defineProps({
    session: Object,
    isOpen: Boolean
  })
  const emit = defineEmits(['select', 'toggle', 'close'])
  
  // Formatador de data
  function formatarDataPersonalizada(dataString) {
    const hoje = new Date()
    const data = new Date(dataString)
    hoje.setHours(0, 0, 0, 0)
    data.setHours(0, 0, 0, 0)
  
    const ontem = new Date(hoje)
    ontem.setDate(hoje.getDate() - 1)
  
    if (data.getTime() === hoje.getTime()) {
      return 'Hoje'
    } else if (data.getTime() === ontem.getTime()) {
      return 'Ontem'
    } else {
      return data.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }
  
  // Referências
  const dropdownRef = ref(null)
  const dropdownButtonRef = ref(null)
  const dropdownStyle = ref({
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: 9999
  })
  
  // Abrir/fechar dropdown e calcular posição
  function toggleDropdown() {
    const rect = dropdownButtonRef.value?.getBoundingClientRect()
    if (rect) {
      dropdownStyle.value = {
        position: 'fixed',
        top: `${rect.bottom + 6}px`,
        left: `${rect.left}px`,
        zIndex: 9999
      }
    }
    emit('toggle', props.session.id)
  }
  
  // Ação clicada
  function handleAction(type) {
    console.log(`Ação "${type}" em sessão ID ${props.session.id}`)
    emit('close')
  }
  
  // Fechar ao clicar fora
  function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      emit('close')
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script>
  
  <style scoped>
  @import '../style/sessioncard.css';
  </style>
  