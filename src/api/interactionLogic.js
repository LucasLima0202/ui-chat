import { http } from './config'

export default {
  salvar: (interacao) => {
    return http.post('interacao', interacao)
  }
}