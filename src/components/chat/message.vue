  <template>
    <div :class="['message', sender === 'user' ? 'user' : 'bot']">
      <LoaderDot v-if="loading" />
      <p v-else>{{ text }}</p>
    </div>
  </template>
  
  <script setup>
  import LoaderDot  from '../additional/dotflashing.vue'

  defineProps({
    text: String,
    sender: String,
    loading: Boolean
  })
  </script>
  
  <style scoped>
    @import "../style/message.css"
  </style>
  