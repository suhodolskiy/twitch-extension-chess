export enum GameStatus {
  Win,
  Draw,
  Loss,
}

export enum GameType {
  Rapid,
  Blitz,
}

export interface Game {
  id: string
  type: GameType
  status: GameStatus
  opponent: {
    name: string
    rapid: number
    avatar: string
  }
}
