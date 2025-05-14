import { normalizeData } from '../utils/normalizeData'

export function classifyMessageType(response) {
  const { message, data, output, question = '' } = response

  const normalized = normalizeData(data)

  // 1. Mensagem nula ou erro do backend
  const messageLower = message?.toLowerCase() || ''
  if (!normalized || normalized.length === 0 || messageLower.includes('nenhuma informação')) {
    return 'message'
  }

  // 2. Palavra-chave explícita que força lista
  const outputLower = output?.toLowerCase?.() || ''
  const questionLower = question?.toLowerCase?.() || ''

  const forceList =
    outputLower.includes('exiba como lista') ||
    questionLower.includes('como lista') ||
    questionLower.includes('em lista') ||
    questionLower.includes('faça uma lista') ||
    questionLower.includes('lista dos') ||
    questionLower.includes('liste') ||
    questionLower.includes('lista')

  if (forceList) return 'list'

  // 3. Dados primitivos em array
  const isPrimitiveList = Array.isArray(normalized) &&
    normalized.every(item => typeof item === 'string' || typeof item === 'number')
  if (isPrimitiveList) return 'list'

  // 4. Objeto único isolado (não array)
  if (!Array.isArray(normalized) && typeof normalized === 'object' && normalized !== null) {
    return 'singleItem'
  }

  // 5. Lista de objetos (tabela ou navegação)
  const isObjectList = Array.isArray(normalized) &&
    normalized.every(item => typeof item === 'object' && item !== null)

  if (isObjectList) {
    if (normalized.length > 15) return 'tablenavigation'
    return 'table'
  }

  // 6. Fallback
  return 'message'
}
