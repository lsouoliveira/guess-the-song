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

export type QuizItemPlayer = {
  play: () => void
  replay: () => void
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
    if (playCount > 0) {
      return
    }

    setPlayCount((prev) => prev + 1)
    setIsPlaying(true)

    audioPlayer.seek(songStartTime())
    audioPlayer.play()
  }

  const pause = () => {
    setIsPlaying(false)
    audioRef.current?.pause()
  }

  const replay = () => {
    setPlayCount((prev) => prev + 1)
    setIsPlaying(true)

    audioPlayer.seek(songStartTime())
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
    return quizItem.song.start_time + quizItem.game.song_segment_duration
  }

  return (
    <QuizItemPlayerContext.Provider
      value={{ playCount, play, replay, isPlaying }}
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
