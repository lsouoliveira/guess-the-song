import { TextInput } from "@mantine/core"
import { useForm } from "@inertiajs/react"
import { KeyboardEvent } from "react"

import { useQuizItemPlayer } from "@/context/quiz_item_player_provider"
import { QuizItem } from "@/types/quiz_items"

export const QuizItemDetailGuessForm = ({
  quizItem,
}: {
  quizItem: QuizItem
}) => {
  const { pause } = useQuizItemPlayer()

  const ongoing = () => {
    return quizItem.status === "ongoing"
  }

  if (!ongoing()) {
    return
  }

  const { data, setData, post, errors } = useForm({
    guess: "",
  })

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      guess()
    }
  }

  const guess = () => {
    post(`${window.location.pathname}/guess`, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        pause()
      },
    })
  }

  return (
    <div>
      <TextInput
        placeholder="Enter your guess"
        value={data.guess}
        onChange={(e) => setData("guess", e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={quizItem.status !== "ongoing"}
        error={errors.song}
      />
    </div>
  )
}
