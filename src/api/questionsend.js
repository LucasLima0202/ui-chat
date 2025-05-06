import { http } from './config'

export default {
  perguntar: (chatinput, signal) => {
    return http.post('/questions/', {
      question: chatinput
    }, { signal })
  }
}