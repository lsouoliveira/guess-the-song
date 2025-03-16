import { Title } from "@mantine/core"
import { RingProgress, Text, Button } from "@mantine/core"

import GamesLayout from "../../layouts/GamesLayout"

import { Game } from "@/types/games"

export default function Show({ game }: { game: Game }) {
  const formattedTime = (time: number) => {
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor((time % 3600) / 60)
    let seconds = Math.floor(time % 60)

    const parts = [hours, minutes, seconds]

    if (!hours) {
      parts.shift()
    }

    return parts.map((unit) => String(unit).padStart(2, "0")).join(":")
  }

  const elapsedTime = (): number => {
    return (Date.parse(game.finished_at) - Date.parse(game.created_at)) / 1000
  }

  const colorForScore = (score: number, maxScore: number) => {
    const ratio = score / maxScore

    if (ratio >= 1) {
      return "green"
    } else if (ratio >= 0.5) {
      return "yellow"
    } else {
      return "red"
    }
  }

  const classificationForScore = (score: number, maxScore: number) => {
    const ratio = score / maxScore

    if (ratio >= 1) {
      return "Expert"
    } else if (ratio >= 0.7) {
      return "Advanced"
    } else if (ratio >= 0.5) {
      return "Intermediate"
    } else if (ratio >= 0.3) {
      return "Novice"
    } else {
      return "Beginner"
    }
  }

  return (
    <GamesLayout>
      <div className="py-6 lg:py-16">
        <div className="flex flex-col items-center">
          <div className="text-center mb-6">
            <Title order={2}>Your results</Title>
          </div>

          <div className="space-y-4">
            <div>
              <RingProgress
                size={240}
                sections={[
                  {
                    value: (game.score / game.max_score) * 100,
                    color: colorForScore(game.score, game.max_score),
                  },
                ]}
                label={
                  <div>
                    <Text
                      c={colorForScore(game.score, game.max_score)}
                      fw={700}
                      ta="center"
                      size="lg"
                    >
                      {game.score} / {game.max_score}
                    </Text>
                    <Text
                      c={colorForScore(game.score, game.max_score)}
                      fw={500}
                      ta="center"
                      size="md"
                    >
                      {classificationForScore(game.score, game.max_score)}
                    </Text>
                  </div>
                }
              />
            </div>

            <div className="text-center">
              <div>
                <Title order={4}>{game.album.name}</Title>
              </div>
              <div className="text-gray-500">
                {formattedTime(elapsedTime())}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button>Play again</Button>
          </div>
        </div>
      </div>
    </GamesLayout>
  )
}
