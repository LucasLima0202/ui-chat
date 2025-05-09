<template>
    <p v-if="message" class="table-message">{{ message }}</p>
  
    <div class="table-wrapper">
      <!-- Título e botões -->
      <section class="p-table-row-comand">
        <div>
          <h5>Alunos Matriculados</h5>
        </div>
        <div class="table-button">
          <button class="copy-button-simpletable" @click="copyTable" :class="{ clicked: copied }">
            <i :class="copied ? 'bi bi-check-lg' : 'bi bi-copy'"></i>
            <span>Copiar</span>
          </button>
          <button class="download-button-simpletable" @click="downloadTable" :class="{ clicked: download }">
            <i :class="download ? 'bi bi-check-lg' : 'bi bi-download'"></i>
            <span>Baixar</span>
          </button>
        </div>
      </section>
  
      <!-- Tabela com scroll horizontal -->
      <div class="datatable-container">
        <DataTable
          class="data-table"
          :value="rows"
          tableStyle="min-width: 1000px"
          stripedRows
          scrollable
          :responsiveLayout="'scroll'"
        >
        <Column
  v-for="col in columns"
  :key="col"
  :field="col"
  :header="formatHeader(col)"
  :footer="formatHeader(col)"
>
  <template #body="slotProps">
    <!-- Aqui você pode manter seu estilo normal para status ou dados -->
    <span v-if="isStatusField(slotProps.data[col])"
          :class="getStatusClass(slotProps.data[col])"
          class="status-tag">
      {{ slotProps.data[col] }}
    </span>
    <span v-else>
      {{ slotProps.data[col] ?? '—' }}
    </span>
  </template>
</Column>
        </DataTable>
      </div>
    
        <!-- Título abaixo do scroll -->
        <div class="table-footer-title">
            <h5>Alunos Matriculados</h5>
        </div>
        </div>
  
    <p v-if="suggestion" class="table-message">{{ suggestion }}</p>
  </template>
  
  <script setup>
  import { ref, computed, nextTick } from 'vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  
  const copied = ref(false)
  const download = ref(false)
  
  const message = 'Visualização de alunos da escola para testes UX'
  const suggestion = 'Você pode copiar ou exportar essa tabela para análise externa.'
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
    },    {
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
    },    {
      nome: "Aline Silva",
      matricula: "MA002",
      enturmado: "Não",
      email: "aline.silva@example.com",
      telefone: "0987654321",
      ensino: "Fundamental",
      idade: 9,
      responsavel: "Carlos Silva",
      endereco: "Rua B, 456"
    }
  ])
  
  const columns = computed(() => {
    const keys = new Set()
    rows.value.forEach(row => {
      Object.keys(row).forEach(key => keys.add(key))
    })
    return Array.from(keys)
  })
  
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
  .table-wrapper {
    display: flex;
    flex-direction: column;
    padding: 25px;
    border-radius: 4px;
  }
  
  .p-table-row-comand {
    text-transform: uppercase;
    letter-spacing: 0.2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #FFFFFF;
    border: #E2E8F0 1px solid;
  }
  
  .p-table-row-comand h5,
  .table-footer-title h5 {
    font-size: 1rem;
    color: #525252c5;
    margin: 0;
    text-wrap: nowrap;
  }
  
  .table-button {
    display: flex;
    gap: 10px;
  }
  
  .copy-button-simpletable,
  .download-button-simpletable {
    background-color: #ffffffa4;
    border: #d1d1d1d4 0.9px solid;
    padding: 9px 14px;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .copy-button-simpletable:hover,
  .download-button-simpletable:hover {
    background-color: #FFEBEB;
    color: #AA2B2B;
  }
  
  .datatable-container {
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .table-footer-title {
    margin-top: 10px;
    text-align: center;
    color: #888;
  }
  
  .table-message {
    margin: 20px 0;
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
  
  ::v-deep(.p-datatable-thead > tr > th) {
    padding: 15px;
    background-color: #F8FAFC !important;
  }
  
  ::v-deep(.p-datatable-tbody > tr > td) {
    padding: 16px;
  }
  </style>
  