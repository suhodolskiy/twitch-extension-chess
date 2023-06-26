import { ChessGame, ChessUser, ChessUserStats } from './types'

interface ChessConfig {
  baseURL: string
  application: string
}

export class Chess {
  constructor(private config: ChessConfig) {}

  private async request<T>(
    path: string,
    options?: RequestInit
  ): Promise<T | undefined> {
    try {
      const response = await fetch(`${this.config.baseURL}${path}`, {
        headers: {
          'User-Agent': this.config.application,
        },
        ...options,
      })

      if (response.status === 200) {
        const data = await response.json()
        return data as T
      }
    } catch (error) {
      return undefined
    }
  }

  async getPlayer(username: string): Promise<ChessUser | undefined> {
    return this.request<ChessUser>(`/pub/player/${username}`)
  }

  async getPlayerStats(username: string): Promise<ChessUserStats | undefined> {
    return this.request<ChessUserStats>(`/pub/player/${username}/stats`)
  }

  async getPlayerGames(
    username: string,
    date: string,
    count: number
  ): Promise<ChessGame[] | undefined> {
    const games = await this.request<{ games: ChessGame[] }>(
      `/pub/player/${username}/games/${date}`
    ).then((response) => response?.games)

    return games?.sort((a, b) => b.end_time - a.end_time).slice(0, count)
  }
}
