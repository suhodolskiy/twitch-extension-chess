export enum GameType {
  Daily,
  Rapid,
  Blitz,
  Bullet,
}

export enum GameStatus {
  Win,
  Loss,
  Draw,
}

export enum StatType {
  Rapid,
  Bullet,
  PuzzlesRush,
  Blitz,
}

export interface Game {
  id: string
  url: string
  type: GameType
  status: GameStatus

  opponent: {
    username: string
    avatar?: string
    stat: number
  }
}

interface Stat {
  type: StatType
  title: string
  value?: number
}

export interface User {
  id: string
  url: string
  name?: string
  title?: string
  avatar?: string
  username: string

  stats: Stat[]
  games: Game[]
}
