import { Game } from "./games"

export type QuizItem = {
  id: number
  attemps: number
  status: string
  position: number
  created_at: string
  game: Game
}
