import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

// Gera novo ID toda vez que o script é carregado
export const id_sessionchat = uuidv4()

// Histórico da sessão atual (limpo a cada reload)
export const sessionMessages = ref([])