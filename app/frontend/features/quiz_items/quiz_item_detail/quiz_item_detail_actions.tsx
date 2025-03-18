import { Button } from "@mantine/core"
import { Badge } from "@mantine/core"
import { IconRotate, IconPlus } from "@tabler/icons-react"
import { useForm } from "@inertiajs/react"

import { QuizItem } from "@/types/quiz_items"
import { useAudio } from "@/context/audio_player_provider"
import { useQuizItemPlayer } from "@/context/quiz_item_player_provider"

type QuizItemDetailActionsProps = {
  quizItem: QuizItem
}

export const QuizItemDetailActions = ({
  quizItem,
}: QuizItemDetailActionsProps) => {
  if (quizItem.status !== "ongoing") {
    return
  }

  const replayForm = useForm({})
  const incrementForm = useForm({})
  const skipForm = useForm({})
  const { isReady } = useAudio()
  const { playCount, isPlaying, play, increment } = useQuizItemPlayer()

  const disabledControls = () => {
    return playCount <= 0
  }

  const isReplayButtonDisabled = () => {
    return (
      quizItem.status !== "ongoing" ||
      !isReady ||
      isPlaying ||
      quizItem.plays_count <= 0 ||
      quizItem.replays_available <= 0
    )
  }

  const isIncrementButtonDisabled = () => {
    return (
      quizItem.status !== "ongoing" ||
      !isReady ||
      isPlaying ||
      quizItem.plays_count <= 0 ||
      quizItem.increments_available <= 0
    )
  }

  const ReplayCountBadge = () => (
    <Badge color="red" circle>
      {quizItem.replays_available}
    </Badge>
  )

  const IncrementsCountBadge = () => (
    <Badge color="red" circle>
      {quizItem.increments_available}
    </Badge>
  )

  const handleReplay = () => {
    replayForm.post(`${window.location.pathname}/play`, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        play()
      },
    })
  }

  const handleIncrement = () => {
    incrementForm.post(`${window.location.pathname}/increment`, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        increment()
      },
    })
  }

  const handleSkip = () => {
    skipForm.post(`${window.location.pathname}/skip`, {
      preserveScroll: true,
      preserveState: true,
    })
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button
          variant="default"
          leftSection={<IconRotate size={14} />}
          rightSection={<ReplayCountBadge />}
          disabled={isReplayButtonDisabled()}
          loading={replayForm.processing}
          onClick={handleReplay}
        >
          Replay
        </Button>
        <Button
          variant="default"
          leftSection={<IconPlus size={14} />}
          rightSection={<IncrementsCountBadge />}
          disabled={isIncrementButtonDisabled()}
          onClick={handleIncrement}
        >
          5 seconds
        </Button>
      </div>
      <Button variant="outline" color="red" onClick={handleSkip}>
        Skip
      </Button>
    </div>
  )
}
