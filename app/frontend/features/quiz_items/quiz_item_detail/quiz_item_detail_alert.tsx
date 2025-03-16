import { Alert } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"

import { QuizItem } from "@/types/quiz_items"

export const QuizItemDetailAlert = ({ quizItem }: { quizItem: QuizItem }) => {
  if (quizItem.status !== "completed" && quizItem.status !== "skipped") {
    return false
  }

  const message = () => {
    if (completed()) {
      return "You guessed correctly"
    }

    return "Skipped"
  }

  const completed = () => {
    return quizItem.status === "completed"
  }

  const color = () => {
    if (completed()) {
      return "green"
    }

    return "red"
  }

  return (
    <div>
      <Alert
        color={color()}
        radius="xs"
        title={message()}
        icon={<IconInfoCircle />}
      ></Alert>
    </div>
  )
}
