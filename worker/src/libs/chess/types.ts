export interface ChessError {
  code: number
  message: string
}

export interface ChessUser {
  '@id': string
  avatar: string
  country: string
  followers: number
  is_streamer: boolean
  joined: boolean
  last_online: number
  title?: string
  name?: string
  player_id: number
  status: string
  url: string
  username: string
  verified: boolean
}

export interface ChessUserStats {
  chess_bullet?: {
    last: {
      rating: number
      date: number
      rd: number
    }
    best: {
      rating: number
      date: number
      game: string
    }
    record: {
      win: number
      loss: number
      draw: number
    }
  }
  chess_blitz?: {
    last: {
      rating: number
      date: number
      rd: number
    }
    best: {
      rating: number
      date: number
      game: string
    }
    record: {
      win: number
      loss: number
      draw: number
    }
  }
  chess_rapid?: {
    last: {
      rating: number
      date: number
      rd: number
    }
    best: {
      rating: number
      date: number
      game: string
    }
    record: {
      win: number
      loss: number
      draw: number
    }
  }
  tactics?: {
    highest: {
      rating: number
      date: number
    }
    lowest: {
      rating: number
      date: number
    }
  }
  puzzle_rush?: {
    best?: {
      total_attempts: number
      score: number
    }
  }
  chess_daily?: {
    last?: {
      rating: number
    }
  }
  chess960_daily?: {
    last?: {
      rating: number
    }
  }

  fide?: number
}

export interface ChessGame {
  url: string
  pgn: string
  time_control: string
  end_time: number
  rated: boolean
  tcn: string
  uuid: string
  initial_setup: string
  fen: string
  time_class: string
  rules: string
  white: {
    rating: number
    result: string
    '@id': string
    username: string
    uuid: string
  }
  black: {
    rating: number
    result: string
    '@id': string
    username: string
    uuid: string
  }
}
