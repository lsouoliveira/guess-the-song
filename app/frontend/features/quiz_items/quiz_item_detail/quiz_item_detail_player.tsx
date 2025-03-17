import { Card } from "@mantine/core"
import { QuizItem } from "@/types/quiz_items"
import { Player } from "@/components/ui/player"

export const QuizItemDetailPlayer = ({ quizItem }: { quizItem: QuizItem }) => {
  const defaultVolume = parseFloat(localStorage.getItem("player:volume") || "1")

  const handleVolumeChange = (volume: number) => {
    console.log("volume", volume)
    localStorage.setItem("player:volume", String(volume))
  }

  if (quizItem.status !== "completed" && quizItem.status !== "skipped") {
    return false
  }

  return (
    <Card padding="md" radius="md" withBorder>
      <Player
        src={quizItem.song.audio_path}
        songName={quizItem.song.name}
        onVolumeChange={handleVolumeChange}
        defaultVolume={defaultVolume}
      />
    </Card>
  )
}
