import { Album } from "@/types/albums"
import { Card, Image, Text } from "@mantine/core"
import { Link } from "@inertiajs/react"

type AlbumCardProps = {
  album: Album
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const albumPath = `/albums/${album.id}`

  return (
    <Card>
      <Card.Section className="relative">
        <Image src={album.cover_path} className="h-64 object-center" />

        <div className="w-full h-full absolute top-0 left-0 bg-black/40 p-6 flex items-end">
          <div>
            <div className="max-w-md">
              <Link href={albumPath}>
                <Text c="white" size="xl" fw={700}>
                  {album.name}
                </Text>
              </Link>

              <Text c="white">
                {album.description}
              </Text>
            </div>
          </div>
        </div>
      </Card.Section>
    </Card>
  )
}
