import { Button } from "@mantine/core"
import { IconRotate, IconPlus } from "@tabler/icons-react"

export const Actions = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button variant="default" leftSection={<IconRotate size={14} />}>
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
