<template>
    <div class="table-wrapper">
      <button
        ref="copyBtn"
        class="copy-button-simpletable"
        :class="{ clicked: copied }"
        @click="copyTable"
      >
        <i :class="copied ? 'bi bi-check2' : 'bi bi-copy'"></i>
      </button>
  
      <p v-if="message" class="table-message">{{ message }}</p>
  
      <DataTable
        :value="rows"
        paginator
        stripedRows
        show-gridlines
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        sortMode="single"
        responsiveLayout="scroll"
        currentPageReportTemplate="{first} a {last} de {totalRecords}"
        tableStyle="min-width: 50rem"
      >
        <template #paginatorstart>
          <Button type="button" icon="pi pi-refresh" text />
        </template>
  
        <template #paginatorend>
          <Button type="button" icon="pi pi-download" text />
        </template>
  
        <Column
          v-for="col in columns"
          :key="col"
          :field="col"
          :header="col"
          sortable
        >
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
  import Button from 'primevue/button'
  import { nextTick } from 'vue'

  const props = defineProps({
    message: String,
    rows: {
      type: Array,
      default: () => []
    }
  })
  
  const copied = ref(false)
  const copyBtn = ref(null)
  
  const columns = computed(() => {
    const allKeys = new Set()
    props.rows.forEach(row => {
      Object.keys(row).forEach(key => allKeys.add(key))
    })
    return Array.from(allKeys)
  })
  
  const copyTable = async () => {
  await nextTick()

  if (copyBtn.value) {
    copyBtn.value.classList.remove('clicked')
    void copyBtn.value.offsetWidth
    copyBtn.value.classList.add('clicked')
  }

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
  

  
  .table-message {
    margin-bottom: 1rem;
  }

  ::v-deep(.p-datatable-thead > tr > th) {
  border: 1px solid rgba(180, 180, 180, 0.934)ant;
  color: #333333;
}

::v-deep(.p-datatable-tbody > tr > td) {
    border: 1px solid rgba(180, 180, 180, 0.934)ant;
    color: black;
}

::v-deep(.p-datatable-tbody > tr) {
    color: black;
}
::v-deep(.p-paginator) {

}
::v-deep(.p-select) {
    background-color: #F6F6F6 !important; /* COR DO TÍTULO */

}
::v-deep(.p-dropdown-panel) {
  background-color: #F6F6F6 !important;
  color: black;
}
::v-deep(.p-dropdown-item.p-highlight) {
  background-color: #d9f7e6 !important;
  color: #000 !important;
}
  </style>
  