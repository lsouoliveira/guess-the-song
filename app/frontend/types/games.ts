import { Album } from "./albums"

export type Game = {
  id: number
  created_at: string
  score: number
  status: string
  album: Album
  quiz_items_count: number
  song_segment_duration: number
  max_score: number
}
