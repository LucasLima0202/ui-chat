  <template>
    <div 
    :class="['message', sender === 'user' ? 'user' : 'bot']" 
  >
      <LoaderDot v-if="loading" />
      <p v-else>{{ text }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import LoaderDot from '../additional/dotflashing.vue'
  
  const props = defineProps({
    text: String,
    sender: String,
    loading: Boolean
  })
  
  // Computed para definir o estilo condicional
  const computedStyle = computed(() => {
    return {
      paddingLeft: props.sender === 'user' ? '16px' : '0px'
    }
  })
  </script>
  
  <style scoped>
    @import "../style/message.css"
  </style>
  