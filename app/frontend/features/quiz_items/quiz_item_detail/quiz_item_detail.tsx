import { QuizItem } from "@/types/quiz_items"
import { QuizItemDetailHeader } from "./quiz_item_detail_header"
import { QuizItemDetailWaveVisualizer } from "./quiz_item_detail_wave_visualizer"
import { QuizItemDetailActions } from "./quiz_item_detail_actions"
import { QuizItemDetailGuessForm } from "./quiz_item_detail_guess_form"
import { SecondaryActions } from "./secondary_actions"
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
          <SecondaryActions />
        </div>

        {/*<div className="border-t mt-8 py-8 lg:mt-12 lg:py-12 border-[light-dark(var(--mantine-color-gray-3),_var(--mantine-color-dark-4))]">
        <Card padding="md" radius="md" withBorder>
          <Player />
        </Card>
      </div>
      */}
      </div>
    </QuizItemPlayerProvider>
  )
}
