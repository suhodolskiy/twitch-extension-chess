import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type * as t from '~/shared/types/api'

class Api {
  client!: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://chess-worker.suhodolskiy.workers.dev',
      // baseURL: 'http://localhost:8787',
    })
  }

  getUser(username: string) {
    return this.client.get<t.User>('/', {
      params: {
        username,
      },
    })
  }
}

export default new Api()
