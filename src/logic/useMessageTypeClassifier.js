// useMessageTypeClassifier.js
export function classifyMessageType(response) {
  const { message, data, output, question = '' } = response

  // 💡 Fallback em caso de dados ausentes
  if (!data || data === '' || data === '[]' || data === '{}' || message?.includes('nenhuma informação')) {
    return 'message'
  }

  let parsedData
  try {
    parsedData = typeof data === 'string' ? JSON.parse(data) : data
  } catch (e) {
    console.warn('Erro ao interpretar `data`: ', e)
    return 'message'
  }

  // 🔍 Detecta palavras-chave na pergunta ou no output
  const lowerOutput = output?.toLowerCase?.() || ''
  const lowerQuestion = question?.toLowerCase?.() || ''

  const explicitList =
    lowerOutput.includes('exiba como lista') ||
    lowerQuestion.includes('como lista') ||
    lowerQuestion.includes('em lista') ||
    lowerQuestion.includes('faça uma lista') ||
    lowerQuestion.includes('lista dos') ||
    lowerQuestion.includes('liste') ||
    lowerQuestion.includes('lista')

  if (explicitList) return 'list'

  // 🔢 Verifica estrutura dos dados
  if (Array.isArray(parsedData)) {
    const isPrimitiveList = parsedData.every(item => typeof item === 'string')
    const isObjectList = parsedData.every(item => typeof item === 'object' && !Array.isArray(item) && item !== null)

    if (isPrimitiveList) return 'list'
    if (isObjectList && parsedData.length > 15) return 'tablenavigation'
    if (isObjectList) return 'table'
  }

  return 'message'
}
