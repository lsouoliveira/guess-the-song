import { Album } from "./albums"

export type Game = {
  id: number
  created_at: Date
  score: number
  album: Album
}
