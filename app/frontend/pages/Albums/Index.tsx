import MainLayout from "@/layouts/main_layout"
import { Title, Text } from "@mantine/core"
import { Album } from "@/types/albums"
import { AlbumCard } from "@/features/albums/album_card"

export default function Index({ albums }: { albums: Array<Album> }) {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <div className="text-center mb-6">
            <Title>Pick an album</Title>
          </div>
          <div className="text-center">
            <Text size="lg">
              Browse through custom albums and see if you can guess all the
              songs. Play now and put your skills to the test!
            </Text>
          </div>
        </div>
        <div>
          <div className="space-y-8">
            {albums.map((album) => (
              <AlbumCard album={album} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
