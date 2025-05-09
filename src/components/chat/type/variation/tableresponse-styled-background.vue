<template>
    <p v-if="message" class="table-message">{{ message }}</p>
   <div class="table-wrapper">
     <!-- Botões -->
      <section class="p-table-row-comand">
       <div>
           <h5>Title Table</h5>
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
     <div class="colortable">
  
     <DataTable 
     :value="rows" 
     :size="rows.value" 
     tableStyle="min-width: 50rem" 
     stripedRows 
     :responsiveLayout="'scroll'"  
     >
      
       <Column v-for="col in columns" :key="col" :field="col" :header="col">
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
     <!-- Sugestão opcional -->
   
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

const getStatusClass = (value) => {
 const normalized = String(value).toLowerCase()
 if (normalized === 'sim' || normalized === 'ativo') return 'status-sim status-ativo'
 if (normalized === 'não' || normalized === 'nao' || normalized === 'inativo') return 'status-nao status-inativo'
 return ''
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
     idade: 9,
     responsavel: "Carlos Silva",
     endereco: "Rua B, 456"
   },
   {
     nome: "Pedro Gomes",
     matricula: "MA003",
     enturmado: "Sim",
     email: "pedro.gomes@example.com",
     telefone: "1122334455",
     ensino: "Médio",
     idade: 15,
     responsavel: "Maria Gomes",
     endereco: "Rua C, 789"
   },
   {
     nome: "Julia Oliveira",
     matricula: "MA004",
     enturmado: "Sim",
     email: "julia.oliveira@example.com",
     telefone: "5566778899",
     ensino: "Fundamental",
     idade: 11,
     responsavel: "Roberto Oliveira",
     endereco: "Rua D, 101"
   },
   {
     nome: "Gabriel Lima",
     matricula: "MA007",
     enturmado: "Sim",
     email: "gabriel.lima@example.com",
     telefone: "4455667788",
     ensino: "Fundamental",
     idade: 12,
     responsavel: "Lucia Lima",
     endereco: "Rua G, 404"
   },
   {
     nome: "Fernanda Sousa",
     matricula: "MA008",
     enturmado: "Não",
     email: "fernanda.souza@example.com",
     telefone: "5566778890",
     ensino: "Fundamental",
     idade: 8,
     responsavel: "Fernando Sousa",
     endereco: "Rua H, 505"
   },
   {
     nome: "João Pedro",
     matricula: "MA009",
     enturmado: "Sim",
     email: "joao.pedro@example.com",
     telefone: "6677889900",
     ensino: "Médio",
     idade: 17,
     responsavel: "Claudia Pedro",
     endereco: "Rua I, 606"
   },
   {
     nome: "Beatriz Mendes",
     matricula: "MA010",
     enturmado: "Sim",
     email: "beatriz.mendes@example.com",
     telefone: "7788990011",
     ensino: "Fundamental",
     idade: 13,
     responsavel: "Ana Mendes",
     endereco: "Rua J, 707"
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



 .p-table-row-comand{
   text-transform: uppercase;
   letter-spacing: 0.2px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 10px 20px;
   background-color: #FFFFFF;
   border-top: #E2E8F0 3px solid;
   border-bottom: #E2E8F0 3px solid;
 }
 .p-table-row-comand h5{
   font-size: 1rem;
   color: #525252c5;
   text-wrap: nowrap;
   margin-bottom: 0;
 }

 .table-wrapper {
   display: flex;
   flex-direction: column;
   padding: 25px;
   background-color: #ECECEF;
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

 ::v-deep(.p-datatable-table-container::-webkit-scrollbar) {
 height: 6px;
}

::v-deep(.p-datatable-table-container::-webkit-scrollbar-track) {
 background: #FFFFFF;
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
   color: #656565 ;
   font-weight: 500;
   text-transform: uppercase;
   font-size: 0.8rem;
}
::v-deep(.p-datatable-tbody){
   color: #656565 ;
   font-weight: 500;
   font-size: 0.8rem;
}
::v-deep(.p-datatable-thead > tr > th){
   padding: 15px ;
   background-color: #F8FAFC !important;
   }
::v-deep(.p-datatable-tbody > tr > td){
border-color: #ECECEF;

border-top: solid 3px #ECECEF;
padding: 16px 16px;
}
::v-deep(.p-datatable-thead > tr > th ){
padding: 24px 15px;
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
 