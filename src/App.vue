<script setup>
import Sidebar from './components/layout/sidebar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <body>
    <div id="app">
      <Sidebar />
      <main class="content">
        <RouterView />
      </main>
    </div>
  </body>
</template>


<style scoped>
body{
  background-color: #f4f4f4 !important;

}
.content {
  flex: 1;
  overflow-y: auto;
}
</style>