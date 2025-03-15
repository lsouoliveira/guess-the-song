import { Game } from "./games"
import { Song } from "./songs"

export type QuizItem = {
  id: number
  attemps: number
  status: string
  position: number
  created_at: string
  game: Game
  song: Song
}
