import { Album } from "@/types/albums"
import { Card, Image, Text } from "@mantine/core"

type AlbumCardProps = {
  album: Album
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
    console.log(album)
  return (
    <Card>
      <Card.Section className="relative">
        <Image src={album.cover_path} className="aspect-video object-center" />

        <div className="w-full h-full absolute top-0 left-0 bg-black/40 p-6 flex items-end">
          <div>
            <div className="max-w-md">
              <Text c="white" size="xl" fw={700}>
                {album.name}
              </Text>

              <Text c="white">
                <p>{album.description}</p>
              </Text>
            </div>
          </div>
        </div>
      </Card.Section>
    </Card>
  )
}
