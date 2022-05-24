import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type * as t from './types'

class Api {
  client!: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://chess-worker.suhodolskiy.workers.dev',
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
