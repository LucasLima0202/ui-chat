<template>
    <p v-if="message" class="table-message">{{ message }}</p>
   <div class="table-wrapper">
      <section class="p-table-row-comand">
       <div>
           <h5>tabela comum</h5>
       </div>
          <div class="table-button">
              <button class="copy-button-simpletable" @click="copyTable" :class="{ clicked: copied }">
                <i :class="copied ? 'bi bi-check-lg' : 'bi bi-copy'"></i>
                <span>Copiar</span>
              </button>
              <button class="download-button-simpletable" @click="downloadTable" :class="{ clicked: download }">
                <i :class="download ? 'bi bi-check-lg' : 'bi bi-download'"></i>
                <span>Baixar Tabela</span>
              </button>
              <button class="outro-button-simpletable" @click="visible = true">
              <Dialog 
          v-model:visible="visible" 
           modal header="Header"
           pt:root:class="!border-0 !bg-transparent"
           pt:mask:class="backdrop-blur-sm"
   
          class="tabela-expandida"
          :style="{ width: '95vw', padding:'15px' , maxWidth: 'none', borderRadius: '0px' }"
          :breakpoints="{ '1199px': '95vw', '575px': '100vw' }"
          :draggable="false"
        >
        <template #container="{ closeCallback }">
                   <div class="p-table-general">
                    <div class="nav-modal">
                      <div>
                        <span>tabela comum</span>
                      </div>
                      <div class="nav-modal-controller">
                        <div class="input-icon-wrapper">
                        <i class="pi pi-search input-icon" />
                        <InputText v-model="filters.global.value" placeholder="Buscar..." />
                      </div>
                      <div>

                        <Button label="Fechar" @click="closeCallback" text class="nav-modal-button"></Button>
                      </div>
                      </div>
                    </div>
                    <DataTable 
                      :value="rows" 
                      class="p-data-table"
                      :scrollable="true"
                      scrollDirection="both"
                      scrollHeight="calc(85vh - 10px)" 
                      :responsiveLayout="'scroll'"
                      :tableStyle="'min-width: 1000px'" 
                      stripedRows  
                      :filters="filters"
                      :globalFilterFields="columns"
                    >
                      <Column
                        v-for="col in columns"
                        :key="col"
                        :field="col"
                        :header="formatHeader(col)"
                        :footer="formatHeader(col)"
                        
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
                          </span>
                        </template>
                      </Column>
                    </DataTable>
                    </div>
                  </template>
              </Dialog>
              <i class="bi bi-arrows-angle-expand"></i>

                <span>Expandir</span>
              </button> 
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
        stripedRows
      >
        <Column
          v-for="col in columns"
          :key="col"
          :field="col"
          :header="formatHeader(col)"
          :footer="formatHeader(col)"
          
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
            </span>
          </template>
        </Column>
      </DataTable>
      </div>
    
        <!-- Título abaixo do scroll
         
        frozen - classe que congela um elemento - denifinir qual sao relevnates, mas o principal caso tenha muita consulta
        -->
       
        </div>
  </template>
  
 
 <script setup>
 import { ref, computed, nextTick } from 'vue'
 import DataTable from 'primevue/datatable'
 import Column from 'primevue/column'
import { Dialog, SelectButton } from 'primevue'
 import InputText from 'primevue/inputtext'
import { FilterMatchMode } from '@primevue/core/api'

 const copied = ref(false)
 const download = ref(false)
 

 
 const isStatusField = (value) => {
 const normalized = String(value).toLowerCase()
 return ['sim', 'não', 'nao', 'ativo', 'inativo','true','false'].includes(normalized)
}

const visible = ref(false);
const maxVisibleColumns = 5 
const maxVisibleRows = 8   

const shouldScrollX = computed(() => columns.value.length > maxVisibleColumns)
const shouldScrollY = computed(() => rows.value.length > maxVisibleRows)

const getStatusClass = (value) => {
 const normalized = String(value).toLowerCase()
 if (normalized === 'sim' || normalized === 'ativo' || normalized == 'true') return 'status-sim status-ativo'
 if (normalized === 'não' || normalized === 'nao' || normalized === 'inativo' || normalized == 'false') return 'status-nao status-inativo'
 return ''
}
const formatHeader = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
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
 
 const copyTable = async () => {
   await nextTick()
   const header = columns.value.join('\t')
   const body = rows.value
     .map(row => columns.value.map(col => row[col] ?? '—').join('\t'))
     .join('\n')
 
   const fullText = `${header}\n${body}`
 
   navigator.clipboard.writeText(fullText)
     .then(() => {
       copied.value = true
       setTimeout(() => (copied.value = false), 2000)
     })
     .catch(err => console.error('Erro ao copiar tabela:', err))
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
   link.setAttribute('download', 'alunos_mock.csv')
   document.body.appendChild(link)
   link.click()
   document.body.removeChild(link)
 
   download.value = true
   setTimeout(() => (download.value = false), 2000)
 }
 </script>
 
 <style scoped>
    @import "../../../style/table.simple.css";
 </style>
 