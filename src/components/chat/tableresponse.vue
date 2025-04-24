<template>
<p>{{ message }}</p>
    <table class="table-response">
      <thead>
        <tr>
          <th v-for="(col, i) in columns" :key="i">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="col in columns" :key="col">
            {{ row[col] ?? '—' }}
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // Define a prop 'rows' do tipo Array
  const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  rows: {
    type: Array,
    default: () => []
  }
})
  // Extrai dinamicamente todas as colunas únicas a partir das linhas
  const columns = computed(() => {
    const allKeys = new Set()
    props.rows.forEach(row => {
      Object.keys(row).forEach(key => allKeys.add(key))
    })
    return Array.from(allKeys)
  })
  </script>
  
  <style scoped>
    @import '../style/tableresponse.css'
  </style>
  