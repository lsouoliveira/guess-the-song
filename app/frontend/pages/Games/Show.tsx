import GamesLayout from "../../layouts/GamesLayout"
import { TextInput } from "@mantine/core"
import { Button } from "@mantine/core"
import { Card } from "@mantine/core"
import { ActionIcon } from "@mantine/core"
import { Flex } from "@mantine/core"

import {
  IconRotate,
  IconPlus,
  IconPlayerSkipForward,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react"
import { Progress } from "@mantine/core"

export default function Show() {
  return (
    <GamesLayout>
      <div className="py-6 lg:py-16">
        <div class="space-y-4">
          <Flex align="center">
            <div className="flex-1 text-lg font-semibold">Album Name</div>

            <div>05:00</div>

            <div className="flex gap-4 items-center justify-end flex-1">
              <div>1 of 10</div>
              <div color="green">500</div>
            </div>
          </Flex>

          <div className="bg-gray-200 h-24"></div>

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

          <div>
            <TextInput placeholder="Enter your guess" />
          </div>

          <div>
            <Button>Next song</Button>
          </div>
        </div>

        <div class="border-t mt-8 py-8 lg:mt-12 lg:py-12 border-[light-dark(var(--mantine-color-gray-3),_var(--mantine-color-dark-4))]">
          <Card padding="md" radius="md" withBorder>
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
          </Card>
        </div>
      </div>
    </GamesLayout>
  )
}
