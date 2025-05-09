<template>
    <p v-if="message" class="table-message">{{ message }}</p>
   <div class="table-wrapper">
     <!-- Botões -->
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
              <!-- <button class="outro-button-simpletable" >
                <span>Outro Button</span>
              </button> -->
          </div>
      </section>
 
     <!-- Mensagem opcional -->
    
 
     <!-- Tabela -->
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
  
    <p v-if="suggestion" class="table-message">{{ suggestion }}</p>
  </template>
  
 
 <script setup>
 import { ref, computed, nextTick } from 'vue'
 import DataTable from 'primevue/datatable'
 import Column from 'primevue/column'
import { SelectButton } from 'primevue'
 
 const copied = ref(false)
 const download = ref(false)
 
 const message = 'Visualização de alunos da escola para testes UX'
 const suggestion = 'Você pode copiar ou exportar essa tabela para análise externa.'
 
 const isStatusField = (value) => {
 const normalized = String(value).toLowerCase()
 return ['sim', 'não', 'nao', 'ativo', 'inativo'].includes(normalized)
}


const maxVisibleColumns = 5 // limite de colunas antes de ativar scroll horizontal
const maxVisibleRows = 8    // limite de linhas antes de ativar scroll vertical

const shouldScrollX = computed(() => columns.value.length > maxVisibleColumns)
const shouldScrollY = computed(() => rows.value.length > maxVisibleRows)

const getStatusClass = (value) => {
 const normalized = String(value).toLowerCase()
 if (normalized === 'sim' || normalized === 'ativo') return 'status-sim status-ativo'
 if (normalized === 'não' || normalized === 'nao' || normalized === 'inativo') return 'status-nao status-inativo'
 return ''
}
const formatHeader = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}
const rows = ref([
   {
     nome: "Lucas Andrade",
     matricula: "MA001",
     enturmado: "Sim",
     email: "lucas.andrade@example.com",
     telefone: "1234567890",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "Aline Silva",
     matricula: "MA002",
     enturmado: "Não",
     email: "aline.silva@example.com",
     telefone: "0987654321",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "Pedro Gomes",
     matricula: "MA003",
     enturmado: "Sim",
     email: "pedro.gomes@example.com",
     telefone: "1122334455",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "Julia Oliveira",
     matricula: "MA004",
     enturmado: "Sim",
     email: "julia.oliveira@example.com",
     telefone: "5566778899",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "Gabriel Lima",
     matricula: "MA007",
     enturmado: "Sim",
     email: "gabriel.lima@example.com",
     telefone: "4455667788",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "Fernanda Sousa",
     matricula: "MA008",
     enturmado: "Não",
     email: "fernanda.souza@example.com",
     telefone: "5566778890",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "João Pedro",
     matricula: "MA009",
     enturmado: "Sim",
     email: "joao.pedro@example.com",
     telefone: "6677889900",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "Beatriz Mendes",
     matricula: "MA010",
     enturmado: "Sim",
     email: "beatriz.mendes@example.com",
     telefone: "7788990011",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "João Pedro",
     matricula: "MA009",
     enturmado: "Sim",
     email: "joao.pedro@example.com",
     telefone: "6677889900",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "Beatriz Mendes",
     matricula: "MA010",
     enturmado: "Sim",
     email: "beatriz.mendes@example.com",
     telefone: "7788990011",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "João Pedro",
     matricula: "MA009",
     enturmado: "Sim",
     email: "joao.pedro@example.com",
     telefone: "6677889900",
     ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   },
   {
     nome: "Beatriz Mendes",
     matricula: "MA010",
     enturmado: "Sim",
     email: "beatriz.mendes@example.com",
     telefone: "7788990011", ensino: "Fundamental",
     idade: 10,
     responsavel: "Ana Andrade",
     endereco: "Rua A, 123"
   }
 ])
 
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

 .table-button{
   gap: 15px;
   display: flex;
 }

 .p-table-general{
  background-color: #ECECEF;
  border: 1px solid #d8d8d8;
  border-top: 0px;
 }

 .p-data-table{
  transform: scale(0.95); 
  /* por enquanto vou usar o metodo scale para diminuir hud das tables, caso de bug volte aqui retire o table
  e no p-table-general volte com padding: 20px para novamente criar as bordas 
  e dps altere todo  tamanho da tabela para menor
  */
 }
 
 .p-table-row-comand{
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
 .p-table-row-comand h5{
   font-size: 0.95rem;
   font-weight: 400;
   color: #2a2a2af1;
   text-wrap: nowrap;
   margin-bottom: 0;
 }

 .table-wrapper {
   display: flex;
   flex-direction: column;
   border-radius: 4px;
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
 
 /* Efeito da onda */


 
 /* Animação */
 @keyframes ripple-effect {
   0% {
     transform: scale(0);
     opacity: 0.5;
   }
   100% {
     transform: scale(2.5);
     opacity: 0;
   }
 }  





/*  
 ::v-deep(.p-datatable-table-container::-webkit-scrollbar) {
 height: 12px;
 width: 12px;
}

::v-deep(.p-datatable-table-container::-webkit-scrollbar-track) {
 background: #FFFFFF;
 border: 1px solid #d8d8d89c;

} */

::v-deep(.p-datatable-tfoot){
  font-weight: 500;
  font-size: 0.8rem;
  border-top: solid 2px #E2E8F0;
  color: #1e1e1e;
}

::v-deep(.p-datatable-tfoot  > tr > td){
   border-top: solid 2px #E2E8F0;
   color: #656565;
   text-transform: uppercase;

}

::v-deep(.p-datatable-table-container::-webkit-scrollbar-thumb) {
 background-color: rgba(100, 100, 100, 0.3);
 border-radius: 3px;
 
 transition: background-color 0.3s;
}

::v-deep(.p-datatable-table-container::-webkit-scrollbar-thumb:hover) {
 background-color: rgba(100, 100, 100, 0.5);
}

::v-deep(.p-datatable-column-title){
   color: #656565;
   font-weight: 500;
   text-transform: uppercase;
   font-size: 0.8rem;
}
::v-deep(.p-datatable-tbody){
   color: #656565; 
   font-weight: 500;
   font-size: 0.8rem;
}
::v-deep(.p-datatable-thead > tr > th){
   padding: 15px ;
   }
::v-deep(.p-datatable-tbody > tr > td){
border-color: #ECECEF;

border-top: solid 3px #ECECEF;
padding: 16px 16px;
}
::v-deep(.p-datatable-thead > tr > th ){
padding: 18px 15px;
}

 .table-message {
   margin: 20px 0;
 }
 .outro-button-simpletable{
   display: flex;
   flex-direction: row;
   gap: 15px;
   background-color: #882222;
   border: none;
   padding: 9px 14px;
   color: #E2E8F0;
   font-weight: 700;
   border: #882222 0.9px solid;
   font-size: 0.9rem;
   border-radius: 4px;
   cursor: pointer;
   transition: background 0.2s ease;
 }
 .copy-button-simpletable,
 .download-button-simpletable {
   display: flex;
   flex-direction: row;
   gap: 15px;
   background-color: #ffffffa4;
   border: none;
   padding: 9px 14px;
   border: #d1d1d1d4 0.9px solid;
   font-size: 0.9rem;
   border-radius: 4px;
   cursor: pointer;
   transition: background 0.2s ease;
 }
 .copy-button-simpletable {
   right: 0px;
 }
 .download-button-simpletable {
   right: 45px;
 }
 .copy-button-simpletable:hover,
 .download-button-simpletable:hover {
   background-color: #FFEBEB;
   color: #AA2B2B;
 }
 </style>
 