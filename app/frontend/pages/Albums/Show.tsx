import MainLayout from "@/layouts/main_layout"
import { Title, Text, Image, Button, Card, Group } from "@mantine/core"
import { Album } from "@/types/albums"
import { router } from "@inertiajs/react"

export default function Show({ album }: { album: Album }) {
  const handlePlay = () => {
    router.post(`/albums/${album.id}/games`)
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <Card shadow="sm" padding="lg" withBorder>
          <Card.Section>
            <Image src={album.cover_path} className="h-64 object-center" />
          </Card.Section>

          <Group mt="md">
            <div>
              <Title order={4}>{album.name}</Title>
              <Text>
                {album.description}
              </Text>
            </div>
          </Group>

          <Group mt="md" justify="center">
            <Button onClick={handlePlay}>Play now</Button>
          </Group>
        </Card>
      </div>
    </MainLayout>
  )
}
