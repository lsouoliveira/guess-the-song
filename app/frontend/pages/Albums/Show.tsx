import React, { useState } from "react"
import MainLayout from "@/layouts/main_layout"
import {
  Title,
  Text,
  Image,
  Button,
  Card,
  Group,
  Select,
  Flex,
} from "@mantine/core"
import { Album } from "@/types/albums"
import { router } from "@inertiajs/react"

const DIFFICULTY_OPTIONS = [
  {
    value: "easy",
    label: "Easy",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "hard",
    label: "Hard",
  },
]

export default function Show({ album }: { album: Album }) {
  const [difficulty, setDifficulty] = useState("easy")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.post(`/albums/${album.id}/games`, {
      game: {
        difficulty,
      },
    })
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <Card shadow="sm" padding="lg" withBorder>
          <Card.Section>
            <Image src={album.cover_path} className="h-64" />
          </Card.Section>

          <Group mt="md">
            <div>
              <Title order={4}>{album.name}</Title>
              <Text>{album.description}</Text>
            </div>
          </Group>

          <Card.Section withBorder mt="md" pt="md" mb="0">
            <form onSubmit={handleSubmit}>
              <Group>
                <Flex
                  direction="column"
                  justify="center"
                  gap="md"
                  className="max-w-md mx-auto w-full max-w-xs"
                >
                  <Select
                    label="Difficulty"
                    data={DIFFICULTY_OPTIONS}
                    required
                    defaultValue="easy"
                    allowDeselect={false}
                    onChange={(value) => setDifficulty(value)}
                  />
                  <Button type="submit">Play now</Button>
                </Flex>
              </Group>
            </form>
          </Card.Section>
        </Card>
      </div>
    </MainLayout>
  )
}
