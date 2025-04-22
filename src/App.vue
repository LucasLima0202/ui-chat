<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Sidebar from './components/navbar/sidebar.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Sessioncard from './components/navbar/sessioncard/sessioncard.vue'

</script>

<template>
 <body>
    <Sidebar></Sidebar>
  </body>
</template>

<style scoped>
body{
  background-color: #f4f4f4 !important;

}

</style>