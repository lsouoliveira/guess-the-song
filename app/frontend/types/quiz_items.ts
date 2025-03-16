import { Game } from "./games"
import { Song } from "./songs"

export type QuizItem = {
  id: number
  attempts: number
  plays_count: number
  status: string
  position: number
  replays_available: number
  created_at: string
  game: Game
  song: Song
  previous_item_id: number
  next_item_id: number
}
