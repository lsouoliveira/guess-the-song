import { useState, useEffect } from "react"

import { ActionIcon } from "@mantine/core"
import { QuizItem } from "@/types/quiz_items"

type QuizItemDetailWaveVisualizerProps = {
  quizItem: QuizItem
}

export const QuizItemDetailWaveVisualizer = ({
  quizItem,
}: QuizItemDetailWaveVisualizerProps) => {
  return (
    <div className="bg-gray-200 h-24">
      <div>
        <ActionIcon radius="xl" />
      </div>
    </div>
  )
}
