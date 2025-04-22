<template>
<section class="session">
    <div class="linediv">
        <h6 class="session-data-title">{{ formatarDataPersonalizada(session.data) }}</h6>
    </div>
    <li class="session-card">
          <span class="session-title" @click="$emit('select', session.id)">
            {{ session.title }}
          </span>
      
          <div class="dropdown" style="position: relative" ref="dropdownRef">
            <button class="btn btn-hover" @click.stop="toggleDropdown">
              <i class="bi bi-three-dots"></i>
            </button>
      
            <ul v-if="isOpen" class="dropdown-menu-custom">
              <li class="dropdown-item" @click="handleAction('action')">Action</li>
              <li class="dropdown-item" @click="handleAction('delete')">Delete</li>
            </ul>
          </div>
        </li>
</section>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  


  function formatarDataPersonalizada(dataString) {
  const hoje = new Date();
  const data = new Date(dataString);

  hoje.setHours(0, 0, 0, 0);
  data.setHours(0, 0, 0, 0);

  const ontem = new Date(hoje);
  ontem.setDate(hoje.getDate() - 1);

  if (data.getTime() === hoje.getTime()) {
    return 'Hoje';
  } else if (data.getTime() === ontem.getTime()) {
    return 'Ontem';
  } else {
    return data.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}



  const props = defineProps({
    session: Object,
    isOpen: Boolean
  })
  const emit = defineEmits(['select', 'toggle', 'close'])
  
  const dropdownRef = ref(null)
  
  function handleAction(type) {
    console.log(`Ação "${type}" em sessão ID ${props.session.id}`)
    emit('close')
  }
  
  function toggleDropdown() {
    emit('toggle', props.session.id)
  }
  
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
  .session{
    display: flex;
    flex-flow: column nowrap;
    gap: 12px;
    margin: 3% 0%;

  }
  .linediv {
  position: relative;
  margin: 25px 0;

  padding-left: 4%;
}

.linediv::before {
  content: "";
  position: absolute;
  top: 47%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #ccc;
  z-index: 0;
}

.linediv .session-data-title {
  position: relative;
  display: inline-block;
  padding: 0 12px;
  background-color: #ffffff; /* mesma cor do fundo da seção */
  z-index: 1;
}
  .session-data-title{
    padding-left: 4%;
    font-weight: 600;
    font-size: 1.08rem;
  }

  .session-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 10px 16px;
    list-style: none;
    border-radius: 14px;
    transition: background 0.2s;
    position: relative;
  }
  
  .session-card:hover {
    background-color: #f4f4f4;
  }
  
  .session-title {
    font-size: 15px;
    font-weight: 500;
  }
  
  .btn-hover {
    transition: all ease-in-out 0.32s;
    background-color: transparent;
    border: none;
    color: #000000;
  }
  .btn-hover:hover {
    background-color:#e4e4e4;
  }
  
  .dropdown-menu-custom {
    position: absolute;
    top: 100%;
    right: 50;
    z-index: 10;
    min-width: 120px;
    padding: 8px 8px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    list-style: none;
  }
  
  .dropdown-item {
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.2s;
  }
  
  .dropdown-item:hover {
    background-color: #f0f0f0c8;
  }
  </style>
  