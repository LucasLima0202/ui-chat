  <template>
    <div 
    :class="['message', sender === 'user' ? 'user' : 'bot']" 
  >
  <span class="message-loader" v-if="loading">
    <LoaderDot/>
  </span>
      <p v-else>{{ text }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import LoaderDot from '../../additional/dotflashing.vue'
  
  const props = defineProps({
    text: String,
    sender: String,
    loading: Boolean
  })
  
  const computedStyle = computed(() => {
    return {
      paddingLeft: props.sender === 'user' ? '16px' : '0px'
    }
  })
  </script>
  
  <style scoped>
    @import "../../style/message.css";
  </style>
  