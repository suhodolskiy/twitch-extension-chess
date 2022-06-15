export enum GameType {
  Daily,
  Daily960,
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
  PuzzleRush,
  Blitz,
  Fide,
  Daily,
  Daily960,
  Puzzles,
}

export interface Game {
  id: string;
  url: string;
  type: GameType;
  status: GameStatus;

  opponent: {
    username: string;
    avatar?: string;
    stat: number;
  };
}

interface Stat {
  type: StatType;
  value?: number;
}

export interface User {
  url: string;
  name?: string;
  title?: string;
  avatar?: string;
  username: string;

  stats: Stat[];
  games: Game[];
}
