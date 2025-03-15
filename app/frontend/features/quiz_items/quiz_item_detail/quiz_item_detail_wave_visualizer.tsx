import { useRef, useEffect, ReactNode } from "react"
import { IconPlayerPlayFilled } from "@tabler/icons-react"
import { ActionIcon } from "@mantine/core"
import { Loader } from "@mantine/core"
import AudioMotionAnalyzer from "audiomotion-analyzer"
import { useForm } from "@inertiajs/react"

import { useAudio } from "@/context/audio_player_provider"
import { useQuizItemPlayer } from "@/context/quiz_item_player_provider"
import { QuizItem } from "@/types/quiz_items"

type OverlayProps = {
  children: ReactNode
  show: boolean
}

type PlayButtonProps = {
  onPlay: () => void
  disabled: boolean
}
const Overlay = ({ children, show }: OverlayProps) => {
  if (!show) {
    return
  }

  return (
    <div className="w-full h-full bg-gray-300/50">
      <div className="flex flex-1 items-center justify-center absolute w-full h-full">
        {children}
      </div>
    </div>
  )
}

const PlayButton = ({ onPlay, disabled }: PlayButtonProps) => {
  return (
    <ActionIcon radius="xl" size="48" onClick={onPlay} disabled={disabled}>
      <IconPlayerPlayFilled size={24} />
    </ActionIcon>
  )
}

export const QuizItemDetailWaveVisualizer = ({
  quizItem,
}: {
  quizItem: QuizItem
}) => {
  const playForm = useForm({})
  const { audioRef, isReady } = useAudio()
  const { play, playCount } = useQuizItemPlayer()

  const containerRef = useRef(null)
  const audioMotionAnalizerRef = useRef<AudioMotionAnalyzer | null>(null)

  useEffect(() => {
    if (containerRef.current && audioRef.current) {
      audioMotionAnalizerRef.current = new AudioMotionAnalyzer(
        containerRef.current,
        {
          source: audioRef.current,
          showPeaks: false,
          showScaleX: false,
          outlineBars: true,
          lineWidth: 1,
          fillAlpha: 0,
          reflexRatio: 0.5,
          reflexAlpha: 0,
          mode: 10,
          overlay: true,
          showBgColor: false,
          gradient: "steelblue",
        },
      )
      audioMotionAnalizerRef.current.registerGradient("custom-gradient", {
        colorStops: ["rgb(34, 139, 230)"],
      })
      audioMotionAnalizerRef.current.setOptions({
        gradient: "custom-gradient",
      })
    }

    return () => {
      audioMotionAnalizerRef.current?.destroy()
    }
  }, [])

  const handlePlay = () => {
    playForm.post(`${window.location.pathname}/play`, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        play()
      },
    })
  }

  return (
    <div className="flex relative h-24">
      <div className="absolute w-full h-full">
        <Overlay
          show={
            isReady &&
            quizItem.status === "ongoing" &&
            !playCount &&
            quizItem.plays_count == 0
          }
        >
          <PlayButton onPlay={handlePlay} disabled={playForm.processing} />
        </Overlay>

        <Overlay show={!isReady}>
          <Loader color="blue" type="dots" />
        </Overlay>
      </div>
      <div ref={containerRef} className="w-full"></div>
    </div>
  )
}
