import { useRef, useEffect } from "react"
import { IconPlayerPlayFilled } from "@tabler/icons-react"
import { ActionIcon } from "@mantine/core"
import AudioMotionAnalyzer from "audiomotion-analyzer"

import { useAudio } from "@/context/audio_player_provider"
import { useQuizItemPlayer } from "@/context/quiz_item_player_provider"

type PlayButtonOverlayProps = {
  show: boolean
  onPlay: () => void
}

const PlayButtonOverlay = ({ show, onPlay }: PlayButtonOverlayProps) => {
  if (!show) {
    return
  }

  return (
    <div className="w-full h-full bg-gray-300/50">
      <div className="flex flex-1 items-center justify-center absolute w-full h-full">
        <ActionIcon radius="xl" size="48" onClick={onPlay}>
          <IconPlayerPlayFilled size={24} />
        </ActionIcon>
      </div>
    </div>
  )
}

export const QuizItemDetailWaveVisualizer = () => {
  const { audioRef } = useAudio()
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

  return (
    <div className="flex h-24 relative">
      <div className="absolute w-full h-full">
        <PlayButtonOverlay onPlay={play} show={!playCount} />
      </div>
      <div className="h-24" ref={containerRef}></div>
    </div>
  )
}
