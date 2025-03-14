import {
  useAudioPlayerContext,
  AudioPlayerProvider,
} from "react-use-audio-player"
import GamesLayout from "@/layouts/GamesLayout"
import { QuizItemDetail } from "@/features/quiz_items/quiz_item_detail"
import { QuizItem } from "@/types/quiz_item"

type ShowProps = {
  quiz_item: QuizItem
}

export default function Show({ quiz_item }: ShowProps) {
  return (
    <GamesLayout>
      <AudioPlayerProvider>
        <QuizItemDetail quizItem={quiz_item} />
      </AudioPlayerProvider>
    </GamesLayout>
  )
}
