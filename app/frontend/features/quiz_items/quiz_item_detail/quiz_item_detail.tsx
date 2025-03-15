import { QuizItem } from "@/types/quiz_items"
import { QuizItemDetailHeader } from "./quiz_item_detail_header"
import { QuizItemDetailWaveVisualizer } from "./quiz_item_detail_wave_visualizer"
import { QuizItemDetailActions } from "./quiz_item_detail_actions"
import { QuizItemDetailGuessForm } from "./quiz_item_detail_guess_form"
import { QuizItemDetailSecondaryActions } from "./quiz_item_detail_secondary_actions"
import { QuizItemDetailAlert } from "./quiz_item_detail_alert"
import { QuizItemDetailPlayer } from "./quiz_item_detail_player"
import { QuizItemPlayerProvider } from "@/context/quiz_item_player_provider"

type QuizItemDetailProps = {
  quizItem: QuizItem
}

export const QuizItemDetail = ({ quizItem }: QuizItemDetailProps) => {
  return (
    <QuizItemPlayerProvider quizItem={quizItem}>
      <div className="py-6 lg:py-16">
        <div className="space-y-4">
          <QuizItemDetailHeader quizItem={quizItem} />
          <QuizItemDetailWaveVisualizer quizItem={quizItem} />
          <QuizItemDetailActions quizItem={quizItem} />
          <QuizItemDetailGuessForm quizItem={quizItem} />
          <QuizItemDetailSecondaryActions quizItem={quizItem} />
        </div>

        <div className="py-8">
          <QuizItemDetailAlert quizItem={quizItem} />
        </div>

        <QuizItemDetailPlayer quizItem={quizItem} />
      </div>
    </QuizItemPlayerProvider>
  )
}
