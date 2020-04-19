export type Round = {
  player1: Player,
  player2: Player,
}

export type Player = {
  name: string,
  points: number,
  yellow: Expedition,
  blue: Expedition,
  white: Expedition,
  green: Expedition,
  red: Expedition
}

export type Expedition = {
  wagers: number,
  cards: Set<number>,
  points: ExpeditionPoints,
}

export type ExpeditionPoints = {
  sum: number,
  expeditionCost: number,
  subtotal: number,
  wager: number,
  total: number,
  eightCardBonus: number,
  finalPoints: number,
}