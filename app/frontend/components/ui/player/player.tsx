import { ActionIcon } from "@mantine/core"
import { Progress } from "@mantine/core"
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react"

export const Player = () => {
  return (
    <div className="space-y-2">
      <div className="font-semibold">Song Name</div>

      <div className="flex items-center gap-2">
        <div className="text-sm">0:00</div>
        <div className="flex-1">
          <Progress value={50} size="sm" />
        </div>
        <div className="text-sm">3:00</div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <ActionIcon variant="default" size={42} radius="xl">
          <IconPlayerPlayFilled size={24} />
        </ActionIcon>
      </div>
    </div>
  )
}
