<template>
  <p v-if="message" class="table-message">{{ message }}</p>
  <div class="table-wrapper">
    <!-- Cabeçalho -->
    <section class="p-table-row-comand">
      <div>
        <h5>tabela navegação</h5>
      </div>
      <div class="table-button">
        <button ref="copyBtn" class="copy-button-simpletable" :class="{ clicked: copied }" @click="copyTable">
          <i :class="copied ? 'bi bi-check2' : 'bi bi-copy'"></i>
          <span>Copiar</span>
        </button>
        <button class="download-button-simpletable" @click="downloadTable" :class="{ clicked: download }">
          <i :class="download ? 'bi bi-check-lg' : 'bi bi-download'"></i>
          <span>Baixar</span>
        </button>
        <div class="input-icon-wrapper">
          <i class="pi pi-search input-icon" />
          <InputText v-model="filters.global.value" placeholder="Buscar..." />
        </div>
      </div>
    </section>

    <!-- Tabela -->
    <div class="p-table-general">
      <DataTable
        :value="rows"
        class="p-data-table"
        :scrollable="shouldScrollX || shouldScrollY"
        :scrollHeight="shouldScrollY ? '650px' : null"
        :responsiveLayout="'scroll'"
        :tableStyle="shouldScrollX ? 'min-width: 1000px' : null"
        :filters="filters"
        :globalFilterFields="columns"
        stripedRows
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        sortMode="single"
        currentPageReportTemplate="{first} a {last} de {totalRecords}"
      >
        <template #empty>Nenhum dado encontrado.</template>
        <template #loading>Carregando dados...</template>

        <Column
          v-for="col in columns"
          :key="col"
          :field="col"
          :header="formatHeader(col)"
          :footer="formatHeader(col)"
          sortable
        >
          <template #body="slotProps">
            <span
              v-if="isStatusField(slotProps.data[col])"
              :class="getStatusClass(slotProps.data[col])"
              class="status-tag"
            >
              {{ slotProps.data[col] }}
            </span>
            <span v-else>
              {{ slotProps.data[col] ?? '—' }}
            </span>          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { FilterMatchMode } from '@primevue/core/api'

const copied = ref(false)
const download = ref(false)
const copyBtn = ref(null)

const isStatusField = (value) => {
 const normalized = String(value).toLowerCase()
 return ['sim', 'não', 'nao', 'ativo', 'inativo','true','false','ativa','inativa'].includes(normalized)
}

const getStatusClass = (value) => {
 const normalized = String(value).toLowerCase()
 if (normalized === 'sim' || normalized === 'ativo' || normalized == 'true' || normalized == 'ativa') return 'status-sim status-ativo'
 if (normalized === 'não' || normalized === 'nao' || normalized === 'inativo' || normalized == 'false' || normalized == 'inativa') return 'status-nao status-inativo'
 return ''
}
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

const props = defineProps({
  message: String,
  class: String,
  title: String,
  titlestr: String,
  rows: {
    type: Array,
    default: () => []
  }
})

const rows = computed(() => props.rows)
 const columns = computed(() => {
   const keys = new Set()
   rows.value.forEach(row => {
     Object.keys(row).forEach(key => keys.add(key))
   })
   return Array.from(keys)
 })


const maxVisibleColumns = 5
const maxVisibleRows = 10
const shouldScrollX = computed(() => columns.value.length > maxVisibleColumns)
const shouldScrollY = computed(() => rows.value.length > maxVisibleRows)

const formatHeader = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

const copyTable = async () => {
  await nextTick()
  if (copyBtn.value) {
    copyBtn.value.classList.remove('clicked')
    void copyBtn.value.offsetWidth
    copyBtn.value.classList.add('clicked')
  }

  const header = columns.value.join('\t')
  const body = mockedRows.value
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

  rows.value.forEach(row => {
    const csvRow = columns.value.map(col =>
      `"${(row[col] ?? '').toString().replace(/"/g, '""')}"`
    )
    csvContent.push(csvRow.join(','))
  })

  const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'tabela_navegavel.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  download.value = true
  setTimeout(() => (download.value = false), 2000)
}
</script>

<style scoped>
/* Use o mesmo estilo da sua tabela anterior para manter consistência */

.table-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
}

.p-table-row-comand {
  text-transform: lowercase;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fffbff;
  border-radius: 12px 12px 0px 0px;
  border: 1px solid #E3E3E3;
}

.p-table-row-comand h5 {
  font-size: 0.95rem;
  font-weight: 400;
  color: #2a2a2af1;
  margin: 0;
}

.p-table-general {
  background-color: #ECECEF;
  border: 1px solid #d8d8d8;
  border-top: 0px;
}

.p-data-table {
  transform: scale(0.95);
}

.table-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.copy-button-simpletable,
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
  display: flex;
  align-items: center;
  gap: 6px;
}

.copy-button-simpletable:hover,
.download-button-simpletable:hover {
  background-color: #d5f1ff;
  color: #051d6a;
}

.input-icon-wrapper {
  position: relative;
}

.input-icon-wrapper input {
  padding-left: 2rem;
}
.status-tag {
 padding: 4px 10px;
 border-radius: 12px;
 font-weight: 600;
 font-size: 0.75rem;
 display: inline-block;
 text-align: center;
 min-width: 60px;
}

.status-sim,
.status-ativo {
 background-color: #e6f9ef;
 color: #1c8c5d;
}

.status-nao,
.status-inativo {
 background-color: #fdecea;
 color: #c43f3f;
}
.input-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #6b7280;
}

.table-message {
  margin-top: 20px;
  margin-bottom: 20px;
}

::v-deep(.p-datatable-thead > tr > th),
::v-deep(.p-datatable-tbody > tr > td) {
  font-size: 0.85rem;
}

::v-deep(.p-datatable-tbody > tr > td){
border-color: #ECECEF;

border-top: solid 3px #ECECEF;
padding: 16px 16px;
}

::v-deep(.p-datatable-tfoot > tr > td) {
  font-weight: 500;
  font-size: 0.8rem;
  border-top: solid 2px #E2E8F0;
  color: #1e1e1e;
}

::v-deep(.p-datatable-scrollable-body) {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.3) transparent;
}

::v-deep(.p-datatable-scrollable-body::-webkit-scrollbar) {
  width: 12px;
  height: 12px;
}

::v-deep(.p-datatable-scrollable-body::-webkit-scrollbar-thumb) {
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 6px;
}

::v-deep(.p-datatable-scrollable-body::-webkit-scrollbar-thumb:hover) {
  background-color: rgba(100, 100, 100, 0.5);
}
</style>
