<template>
  <div class="table-wrapper">
    <button class="copy-button-simpletable" @click="copyTable" :class="{ clicked: copied }">
      <i :class="copied ? 'bi bi-check-lg' : 'bi bi-copy'"></i>
    </button>
    <button class="download-button-simpletable" @click="downloadTable" :class="{ clicked: download }">
      <i :class="download ? 'bi bi-check-lg' : 'bi bi-download'"></i>
    </button>

    <p v-if="message" class="table-message">{{ message }}</p>

    <DataTable :value="rows" stripedRows :responsiveLayout="'scroll'" show-gridlines>
      <Column v-for="col in columns" :key="col" :field="col" :header="col">
        <template #body="slotProps">
          {{ slotProps.data[col] ?? '—' }}
        </template>
      </Column>
    </DataTable>
    <p v-if="message" class="table-message">{{ suggestion }}</p>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  suggestion: String,
  rows: {
    type: Array,
    default: () => []
  }
})

const copied = ref(false)
const download = ref(false)

const columns = computed(() => {
  const allKeys = new Set()
  props.rows.forEach(row => {
    Object.keys(row).forEach(key => allKeys.add(key))
  })
  return Array.from(allKeys)
})

const copyTable = () => {
  const btn = document.querySelector('.copy-button-simpletable')
  btn.classList.remove('clicked')
  void btn.offsetWidth
  btn.classList.add('clicked')

  const header = columns.value.join('\t')
  const body = props.rows
    .map(row => columns.value.map(col => row[col] ?? '—').join('\t'))
    .join('\n')
  const fullText = `${header}\n${body}`

  navigator.clipboard.writeText(fullText)
    .then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
    .catch(err => console.error('Erro ao copiar tabela:', err))
}
const downloadTable = () => {
  const csvContent = []
  csvContent.push(columns.value.join(',')) // cabeçalhos

  props.rows.forEach(row => {
    const csvRow = columns.value.map(col => `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`)
    csvContent.push(csvRow.join(','))
  })

  const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'tabela.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  download.value = true
  setTimeout(() => (download.value = false), 2000)
}
</script>

<style scoped>
@import '../../style/tableresponse.css';
.copy-button-simpletable.clicked::after {
    animation: ripple-effect 0.9s ease-out;
  }
.copy-button-simpletable{
    top: 20px;
    position: absolute;
    right: 0px;
    background-color: #f0f0f0;
    border: none;
    padding: 6px 10px;
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .table-message {
    margin-bottom: 20px;
    margin-top: 20px;

  }

  .copy-button-simpletable {
    top: 20px;
    position: absolute;
    right: 0px !important;
    background-color: #f0f0f0;
    border: none;
    padding: 6px 10px;
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
    overflow: hidden;
  }

  .download-button-simpletable {
    top: 20px;
    position: absolute;
    right: 40px !important;
    background-color: #f0f0f0;
    border: none;
    padding: 6px 10px;
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
    overflow: hidden;
  }

  .download-button-simpletable:hover {
    background-color: #ECFDF5;
    color: #1cc55f;
  }
  
  
  .copy-button-simpletable:hover {
    background-color: #ECFDF5;
    color: #1cc55f;
  }

/*
::v-deep(.p-datatable-thead > tr > th) {
  background-color: rgba(242, 242, 242, 0.985) !important; 
  border: 1px solid rgba(180, 180, 180, 0.934)ant;
  color: #333333;
}

::v-deep(.p-datatable-tbody > tr > td) {
    border: 1px solid rgba(180, 180, 180, 0.934)ant;
    color: black;
}


::v-deep(.p-row-odd > tr) {
  background-color: aqua !important;
    color: black;
}
::v-deep(.p-row-even> tr) {
  background-color: aqua !important;
    color: black;
    background: #333333 !important;
}
*/

</style>
