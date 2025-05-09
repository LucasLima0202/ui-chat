import { http } from './config'

export default {
  salvar: (payload) => {
    return http.post('', payload)
  }
}
