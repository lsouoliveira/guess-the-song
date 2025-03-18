import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react"

import { AudioPlayerProvider } from "./audio_player_provider"
import { useAudio } from "@/context/audio_player_provider"
import { QuizItem } from "@/types/quiz_items"

const INCREMENT_LENGTH = 5

export type QuizItemPlayer = {
  play: () => void
  increment: () => void
  playCount: number
  isPlaying: boolean
}

export const QuizItemPlayerContext = createContext<QuizItemPlayer | null>(null)

const ProviderRoot = ({
  quizItem,
  children,
}: {
  quizItem: QuizItem
  children: ReactNode
}) => {
  const audioPlayer = useAudio()
  const [playCount, setPlayCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = audioPlayer.audioRef

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate)
    }

    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [])

  useEffect(() => {
    if (isPlaying && currentTime >= songEndTime()) {
      pause()
    }
  }, [currentTime])

  const play = () => {
    setPlayCount((prev) => prev + 1)
    setIsPlaying(true)

    audioPlayer.seek(songStartTime())
    audioPlayer.play()
  }

  const pause = () => {
    setIsPlaying(false)
    audioRef.current?.pause()
  }

  const increment = () => {
    setPlayCount((prev) => prev + 1)
    setIsPlaying(true)

    audioPlayer.play()
  }

  const handleTimeUpdate = () => {
    const time = Math.floor(audioRef.current?.currentTime || 0)

    setCurrentTime(time)
  }

  const songStartTime = () => {
    return quizItem.song.start_time
  }

  const songEndTime = () => {
    return (
      quizItem.song.start_time +
      quizItem.game.song_segment_duration +
      incrementsDuration()
    )
  }

  const incrementsDuration = () => {
    return quizItem.increments_count * INCREMENT_LENGTH
  }

  return (
    <QuizItemPlayerContext.Provider
      value={{ playCount, play, increment, isPlaying }}
    >
      {children}
    </QuizItemPlayerContext.Provider>
  )
}

export const QuizItemPlayerProvider = ({
  quizItem,
  children,
}: {
  quizItem: QuizItem
  children: ReactNode
}) => {
  return (
    <AudioPlayerProvider src={quizItem.song.audio_path}>
      <ProviderRoot quizItem={quizItem}>{children}</ProviderRoot>
    </AudioPlayerProvider>
  )
}

export const useQuizItemPlayer = () => {
  const context = useContext(QuizItemPlayerContext)

  if (!context) {
    throw "useAudio must be used within QuizItemPlayerProvider"
  }

  return context
}
