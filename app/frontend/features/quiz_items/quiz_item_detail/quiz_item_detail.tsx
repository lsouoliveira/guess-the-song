import { TextInput } from "@mantine/core"
import { Card } from "@mantine/core"

import {
  IconRotate,
  IconPlus,
  IconPlayerSkipForward,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react"

import { QuizItem } from "@/types/quiz_item"
import { Player } from "@/components/ui/player"
import { QuizItemDetailHeader } from "./quiz_item_detail_header"
import { QuizItemDetailWaveVisualizer } from "./quiz_item_detail_wave_visualizer"
import { Actions } from "./actions"
import { SecondaryActions } from "./secondary_actions"

export const QuizItemDetail = ({ quizItem }: QuizItem) => {
  return (
    <div className="py-6 lg:py-16">
      <div className="space-y-4">
        <QuizItemDetailHeader quizItem={quizItem} />
        <QuizItemDetailWaveVisualizer quizItem={quizItem} />
        <Actions />
        <div>
          <TextInput placeholder="Enter your guess" />
        </div>
        <SecondaryActions />
      </div>

      {/*<div className="border-t mt-8 py-8 lg:mt-12 lg:py-12 border-[light-dark(var(--mantine-color-gray-3),_var(--mantine-color-dark-4))]">
        <Card padding="md" radius="md" withBorder>
          <Player />
        </Card>
      </div>
      */}
    </div>
  )
}
