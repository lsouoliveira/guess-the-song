import { Album } from "./albums"

export type Game = {
  id: number
  created_at: Date
  score: number
  status: string
  album: Album
  quiz_items_count: number
}
