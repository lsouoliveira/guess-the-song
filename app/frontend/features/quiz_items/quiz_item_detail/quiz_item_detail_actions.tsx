import { Button } from "@mantine/core"
import { Badge } from "@mantine/core"
import { IconRotate, IconPlus } from "@tabler/icons-react"

import { QuizItem } from "@/types/quiz_items"

type QuizItemDetailActionsProps = {
  quizItem: QuizItem
}

export const QuizItemDetailActions = ({
  quizItem,
}: QuizItemDetailActionsProps) => {
  const ReplayCountBadge = () => (
    <Badge color="red" circle>
      {quizItem.replays_available}
    </Badge>
  )

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button
          variant="default"
          leftSection={<IconRotate size={14} />}
          rightSection={<ReplayCountBadge />}
        >
          Replay
        </Button>
        <Button variant="default" leftSection={<IconPlus size={14} />}>
          5 seconds
        </Button>
      </div>
      <Button variant="outline" color="red">
        Skip
      </Button>
    </div>
  )
}
