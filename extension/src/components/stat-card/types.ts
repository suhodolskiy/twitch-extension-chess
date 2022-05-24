export enum StatType {
  Rapid = 'Rapid',
  Bullet = 'Bullet',
  Pazzles = 'Pazzles',
  Blitz = 'Blitz',
}

export interface Stat {
  type: StatType
  value: number
}
