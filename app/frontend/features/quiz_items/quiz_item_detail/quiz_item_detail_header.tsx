import { useState, useEffect } from "react"
import { Badge } from "@mantine/core"

import { QuizItem } from "@/types/quiz_items"

type QuizItemDetailHeaderProps = {
  quizItem: QuizItem
}

export const QuizItemDetailHeader = ({
  quizItem,
}: QuizItemDetailHeaderProps) => {
  const [currentTime, setCurrentTime] = useState(
    (Date.now() - Date.parse(quizItem.game.created_at)) / 1000,
  )

  useEffect(() => {
    const gameCreatedAt = Date.parse(quizItem.game.created_at)
    const interval = setInterval(() => {
      setCurrentTime((Date.now() - gameCreatedAt) / 1000)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const elapsedTime = () => {
    let hours = Math.floor(currentTime / 3600)
    let minutes = Math.floor((currentTime % 3600) / 60)
    let seconds = Math.floor(currentTime % 60)

    const parts = [hours, minutes, seconds]

    if (!hours) {
      parts.shift()
    }

    return parts.map((unit) => String(unit).padStart(2, "0")).join(":")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex-1 text-lg font-semibold">
          {quizItem.game.album.name}
        </div>

        <div>{elapsedTime()}</div>

        <div className="flex gap-4 items-center justify-end flex-1">
          <div>
            <Badge color="gray">1 of 10</Badge>
          </div>
          <div color="green">500</div>
        </div>
      </div>
    </div>
  )
}
