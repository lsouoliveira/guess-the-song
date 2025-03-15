import { ReactNode, createContext, useContext, useState } from "react"

import { AudioPlayerProvider } from "./audio_player_provider"
import { useAudio } from "@/context/audio_player_provider"
import { QuizItem } from "@/types/quiz_items"

export type QuizItemPlayer = {
  play: () => void
  playCount: number
  startTime: number
  endTime: number
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
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [playCount, setPlayCount] = useState(0)

  const play = () => {
    if (playCount > 0) {
      return
    }

    setPlayCount((prev) => prev + 1)
    audioPlayer.play()
  }

  return (
    <QuizItemPlayerContext.Provider
      value={{ startTime, endTime, playCount, play }}
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
