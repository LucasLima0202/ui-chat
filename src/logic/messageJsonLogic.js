export const mapMensagemParaArquivo = (mensagem) => {
    const lower = mensagem.toLowerCase()
  
    if (lower.includes('mais alunos')) return 'mais-alunos.json'
    if (lower.includes('liste todas as turmas')) return 'todas-turmas.json'
    if (lower.includes('suas turmas')) return 'suas-turmas.json'
    if (lower.includes('primeiras 5')) return 'primeiras-5-turmas.json'
    if (lower.includes('quantas turmas')) return 'total-turma.json' 
    if (lower.includes('existem')) return 'turmas-existente.json'
  
    return null
  }