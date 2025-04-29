<template>
 <div class="table-wrapper">
  <button class="copy-button" @click="copyTable">
    <i class="bi bi-copy"></i>
  </button>

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
  </div>
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

  const copyTable = () => {
  const header = columns.value.join('\t')
  const body = props.rows
    .map(row => columns.value.map(col => row[col] ?? '—').join('\t'))
    .join('\n')
  const fullText = `${header}\n${body}`

  navigator.clipboard.writeText(fullText).then(() => {
    console.log('Tabela copiada com sucesso!') // Aqui você pode usar um toast se quiser
  }).catch(err => {
    console.error('Erro ao copiar tabela:', err)
  })
}
  </script>
  
  <style scoped>
    @import '../../style/tableresponse.css'
    
  </style>
  