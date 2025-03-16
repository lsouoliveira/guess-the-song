import { useState, useEffect } from "react"
import { Badge } from "@mantine/core"

import { QuizItem } from "@/types/quiz_items"

type QuizItemDetailHeaderProps = {
  quizItem: QuizItem
}

const formatTime = (time: number) => {
  let hours = Math.floor(time / 3600)
  let minutes = Math.floor((time % 3600) / 60)
  let seconds = Math.floor(time % 60)

  const parts = [hours, minutes, seconds]

  if (!hours) {
    parts.shift()
  }

  return parts.map((unit) => String(unit).padStart(2, "0")).join(":")
}

const Timer = ({ startedAt }: { startedAt: string }) => {
  const [currentTime, setCurrentTime] = useState(
    (Date.now() - Date.parse(startedAt)) / 1000,
  )

  useEffect(() => {
    const gameCreatedAt = Date.parse(startedAt)
    const interval = setInterval(() => {
      setCurrentTime((Date.now() - gameCreatedAt) / 1000)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div>{formatTime(currentTime)}</div>
}

export const QuizItemDetailHeader = ({
  quizItem,
}: QuizItemDetailHeaderProps) => {
  const badgeColor = () => {
    const score = quizItem.game.score / quizItem.game.max_score

    if (score >= 1) {
      return "green"
    } else if (score >= 0.5) {
      return "yellow"
    } else {
      return "red"
    }
  }

  const totalTime = () => {
    const time =
      (Date.parse(quizItem.game.finished_at) -
        Date.parse(quizItem.game.created_at)) /
      1000

    return formatTime(time)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex-1 text-lg font-semibold">
          {quizItem.game.album.name}
        </div>

        {quizItem.game.status == "completed" ? (
          <div>{totalTime()}</div>
        ) : (
          <Timer startedAt={quizItem.game.created_at} />
        )}

        <div className="flex gap-4 items-center justify-end flex-1">
          <Badge color="gray">
            {quizItem.position} of {quizItem.game.quiz_items_count}
          </Badge>
          <Badge color={badgeColor()}>{quizItem.game.score}</Badge>
        </div>
      </div>
    </div>
  )
}
