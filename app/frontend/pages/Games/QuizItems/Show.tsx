import GamesLayout from "@/layouts/GamesLayout"
import { QuizItemDetail } from "@/features/quiz_items/quiz_item_detail"
import { QuizItem } from "@/types/quiz_item"

type ShowProps = {
  quiz_item: QuizItem
}

export default function Show({ quiz_item }: ShowProps) {
  return (
    <GamesLayout>
      <QuizItemDetail quizItem={quiz_item} />
    </GamesLayout>
  )
}
