<template>
    <p v-if="message" class="table-message">{{ message }}</p>
  <div class="table-wrapper">

    <DataTable
      :value="rows"
      :filters="filters"
      :globalFilterFields="columns"
      paginator
      showGridlines
      stripedRows
      
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      sortMode="single"
      responsiveLayout="scroll"
      currentPageReportTemplate="{first} a {last} de {totalRecords}"
      tableStyle="min-width: 50rem"
    >
      <!-- Cabeçalho com campo de busca e ações -->
      <template #header>
        <section class="header">
        <div><p class="header-title">Tablename</p></div>
        <div class="flex justify-between align-items-center w-full header-table">
          <!-- Botões -->
          <div class="table-actions">
            <button
              ref="copyBtn"
              class="copy-button-simpletable"
              :class="{ clicked: copied }"
              @click="copyTable"
            >
              <i :class="copied ? 'bi bi-check2' : 'bi bi-copy'"></i>
            </button>
            <button
              class="download-button-simpletable"
              @click="downloadTable"
              :class="{ clicked: download }"
            >
              <i :class="download ? 'bi bi-check-lg' : 'bi bi-download'"></i>
            </button>
          </div>

          <!-- Campo de busca -->
          <div class="table-searchbar">
            <div class="input-icon-wrapper">
              <i class="pi pi-search input-icon" />
              <InputText v-model="filters.global.value" placeholder="Buscar..." />
          </div>
          </div>
        </div>
      </section>
      </template>

      <template #empty> Nenhum dado encontrado. </template>
      <template #loading> Carregando dados... </template>

      <!-- Colunas geradas automaticamente -->
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
import { ref, computed, nextTick } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { FilterMatchMode } from '@primevue/core/api'
import { SelectButton } from 'primevue'

const props = defineProps({
  message: String,
  rows: {
    type: Array,
    default: () => []
  }
})

const copied = ref(false)
const download = ref(false)
const copyBtn = ref(null)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const columns = computed(() => {
  const keys = new Set()
  props.rows.forEach(row => {
    Object.keys(row).forEach(key => keys.add(key))
  })
  return Array.from(keys)
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
  navigator.clipboard.writeText(fullText).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}

const downloadTable = () => {
  const csvContent = []
  csvContent.push(columns.value.join(','))

  props.rows.forEach(row => {
    const csvRow = columns.value.map(col =>
      `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`
    )
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

 .header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

 }

.header-table{
  display: flex;
  justify-content: flex-start;
  flex-flow: row-reverse;
  gap: 12px;

}

.table-actions{
  display: flex;
  gap: 12px;

}

.header-title{
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

  .copy-button-simpletable{

    background-color: #F8FAFC;
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
    border: 1px solid #CBD5E1;
    background-color: #F8FAFC;
    padding: 9px 12.5px;
      font-size: 0.9rem;
    border-radius: 4px;
    color: #2b2b2e;
    cursor: pointer;
    transition: background 0.2s ease;
    overflow: hidden;
  }

  .download-button-simpletable {
    border: 1px solid #CBD5E1;
    background-color: #F8FAFC;
    padding: 9px 12.5px;
    font-size: 0.9rem;
    border-radius: 4px;
    color: #2b2b2e;
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

  .input-icon-wrapper {
  position: relative;
  display: inline-block;
}
.input-icon-wrapper input {
  padding-left: 2rem;
}
.input-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #6b7280;
}

  .table-message {
    margin-bottom: 1rem;
  }

  ::v-deep(.p-datatable-thead > tr > th) {
  border: 1px solid rgba(180, 180, 180, 0.934)ant;
  /* background-color: #F8FAFC !important; */

  color: #333333;
}

::v-deep(.p-datatable-tbody > tr > td) {
    border: 1px solid rgba(180, 180, 180, 0.934)ant;
    color: black;
}

::v-deep(.p-datatable-tbody > tr) {
    color: black;
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
  