<template>
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
  .table-response {
    width: 100%;
    border-collapse: collapse;
  }
  .table-response th,
  .table-response td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }
  </style>
  