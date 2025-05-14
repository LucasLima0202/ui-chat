export function normalizeData(rawData) {
  let data = rawData

  try {
    if (typeof rawData === 'string') {
      data = JSON.parse(rawData)
    }
  } catch (err) {
    console.warn('Erro ao converter data para JSON:', err)
    return []
  }

  // ✅ Estrutura especial do tipo: [{ Colunas: [...] }, { Exemplo: [...] }, ...]
  if (
    Array.isArray(data) &&
    data.length >= 2 &&
    data[0]?.Colunas &&
    data.slice(1).every(item => item?.Exemplo)
  ) {
    const colunas = data[0].Colunas

    return data.slice(1).map(obj => {
      const linha = obj.Exemplo
      return Object.fromEntries(colunas.map((key, idx) => [key, linha[idx]]))
    })
  }

  // ✅ Já é um array de objetos
  if (Array.isArray(data) && typeof data[0] === 'object' && !Array.isArray(data[0])) {
    return data
  }

  // ✅ É um array de strings (tipo lista descritiva)
  if (Array.isArray(data) && typeof data[0] === 'string') {
    return data
  }

  return []
}
