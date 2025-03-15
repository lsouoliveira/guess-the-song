import { Button } from "@mantine/core"
import { QuizItem } from "@/types/quiz_items"

export const QuizItemDetailSecondaryActions = ({
  quizItem,
}: {
  quizItem: QuizItem
}) => {
  if (quizItem.status !== "completed" && quizItem.status !== "skipped") {
    return false
  }

  return (
    <div>
      <Button>Next song</Button>
    </div>
  )
}
