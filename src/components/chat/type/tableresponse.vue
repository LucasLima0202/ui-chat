<template>
  <div class="table-wrapper">
    <button class="copy-button-simpletable" @click="copyTable" :class="{ clicked: copied }">
      <i :class="copied ? 'bi bi-check-lg' : 'bi bi-copy'"></i>
    </button>

    <p v-if="message" class="table-message">{{ message }}</p>

    <DataTable :value="rows" stripedRows :responsiveLayout="'scroll'" show-gridlines>
      <Column v-for="col in columns" :key="col" :field="col" :header="col">
        <template #body="slotProps">
          {{ slotProps.data[col] ?? '—' }}
        </template>
      </Column>
    </DataTable>
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
  rows: {
    type: Array,
    default: () => []
  }
})

const copied = ref(false)

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
</script>

<style scoped>
@import '../../style/tableresponse.css';
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
