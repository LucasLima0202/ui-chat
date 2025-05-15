<template>
  <p v-if="message" class="table-message">{{ message }}</p>
  <div class="table-wrapper">
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
          <span>Baixar Tabela</span>
        </button>
        <div class="input-icon-wrapper">
          <i class="pi pi-search input-icon" />
          <InputText v-model="filters.global.value" placeholder="Buscar..." />
        </div>
      </div>
    </section>

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
    @import "../../../style/table.navigation.css";
</style>
