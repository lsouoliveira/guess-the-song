import { Card } from "@mantine/core"
import { QuizItem } from "@/types/quiz_items"
import { Player } from "@/components/ui/player"

export const QuizItemDetailPlayer = ({ quizItem }: { quizItem: QuizItem }) => {
  if (quizItem.status !== "completed" && quizItem.status !== "skipped") {
    return false
  }

  return (
    <Card padding="md" radius="md" withBorder>
      <Player />
    </Card>
  )
}
