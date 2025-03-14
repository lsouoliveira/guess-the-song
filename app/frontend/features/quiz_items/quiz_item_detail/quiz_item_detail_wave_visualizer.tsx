import { useRef, useEffect, RefObject } from "react"
import { IconPlayerPlayFilled } from "@tabler/icons-react"
import { ActionIcon } from "@mantine/core"
import AudioMotionAnalyzer from "audiomotion-analyzer"

import { useAudio } from "@/context/audio_player_provider"

type PlayButtonProps = {
  show: boolean
  onPlay: () => void
}

const PlayButton = ({ show, onPlay }: PlayButtonProps) => {
  if (!show) {
    return
  }

  return (
    <ActionIcon radius="xl" size="48" onClick={onPlay}>
      <IconPlayerPlayFilled size={24} />
    </ActionIcon>
  )
}

export const QuizItemDetailWaveVisualizer = () => {
  const { play, isPlaying, audioRef } = useAudio()
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
      {!isPlaying ? (
        <div className="bg-gray-300/100 absolute w-full h-full opacity-50"></div>
      ) : null}
      <div className="flex flex-1 items-center justify-center absolute w-full h-full">
        <PlayButton onPlay={play} show={!isPlaying} />
      </div>
      <div className="h-24" ref={containerRef}></div>
    </div>
  )
}
