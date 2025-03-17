import { useRef, useEffect, useState } from "react"
import { ActionIcon, Slider } from "@mantine/core"
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react"

import { formatTime } from "@/utils/formatters"

type PlayerProps = {
  src: string
  songName: string
  defaultVolume?: number
  onVolumeChange?: (volume: number) => void
}

type ActionButtonProps = {
  onClick: () => void
  icon: React.ReactNode
}

const ActionButton = ({ onClick, icon }: ActionButtonProps) => {
  return (
    <ActionIcon variant="default" size={48} radius="xl" onClick={onClick}>
      {icon}
    </ActionIcon>
  )
}

const PlayButton = ({ onPlay }: { onPlay: () => void }) => {
  return (
    <ActionButton onClick={onPlay} icon={<IconPlayerPlayFilled size={24} />} />
  )
}

const MuteButton = ({
  onMute,
  high,
}: {
  onMute: () => void
  high?: boolean
}) => {
  return (
    <ActionIcon size={24} variant="transparent" onClick={onMute}>
      {high ? <IconVolume size={24} /> : <IconVolume2 size={24} />}
    </ActionIcon>
  )
}

const UnmuteButton = ({ onUnmute }: { onUnmute: () => void }) => {
  return (
    <ActionIcon size={24} variant="transparent" onClick={onUnmute}>
      <IconVolume3 size={24} />
    </ActionIcon>
  )
}

const PauseButton = ({ onPause }: { onPause: () => void }) => {
  return (
    <ActionButton
      onClick={onPause}
      icon={<IconPlayerPauseFilled size={24} />}
    />
  )
}

export const Player = ({ src, songName, defaultVolume, onVolumeChange }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [volume, setVolume] = useState(defaultVolume ?? 1)

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    audioRef.current.volume = volume
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate)
    audioRef.current.addEventListener("durationchange", handleDurationChange)
    audioRef.current.addEventListener("pause", handlePause)
    audioRef.current.addEventListener("play", handlePlaying)

    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate)
      audioRef.current?.removeEventListener(
        "durationchange",
        handleDurationChange,
      )
      audioRef.current?.removeEventListener("pause", handlePause)
      audioRef.current?.removeEventListener("play", handlePlaying)
    }
  }, [])

  const handleTimeUpdate = () => {
    if (!audioRef.current) {
      return
    }

    const time = Math.floor(audioRef.current.currentTime)

    if (time === currentTime) {
      return
    }

    setCurrentTime(time)
  }

  const handleDurationChange = () => {
    if (!audioRef.current) {
      return
    }

    setDuration(audioRef.current.duration)
  }

  const handlePause = () => {
    setIsPaused(true)
  }

  const handlePlaying = () => {
    setIsPaused(false)
  }

  const handlePlay = () => {
    if (!audioRef.current) {
      return
    }

    if (audioRef.current.paused) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }

  const handleChange = (value: number) => {
    if (!audioRef.current) {
      return
    }

    audioRef.current.currentTime = value
    setCurrentTime(value)
  }

  const updateVolume = (value: number) => {
    if (!audioRef.current) {
      return
    }

    audioRef.current.volume = value
    setVolume(value)
    onVolumeChange?.(value)
  }

  const isPlaying = !isPaused
  const isMuted = volume <= 0
  const formattedCurrentTime = formatTime(currentTime)
  const formattedDuration = formatTime(duration)

  return (
    <div className="space-y-2">
      <audio ref={audioRef} src={src} preload="metadata" autoPlay={false} />
      <div className="font-semibold">{songName}</div>

      <div className="flex items-center gap-2">
        <div className="text-sm">{formattedCurrentTime}</div>
        <div className="flex-1">
          <Slider
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleChange}
          />
        </div>
        <div className="text-sm">{formattedDuration}</div>
      </div>

      <div className="flex items-center justify-center gap-4 relative">
        <div>
          {isPlaying ? (
            <PauseButton onPause={handlePlay} />
          ) : (
            <PlayButton onPlay={handlePlay} />
          )}
        </div>

        <div className="absolute right-0 top-0 h-full flex items-center gap-2">
          {isMuted ? (
            <UnmuteButton onUnmute={() => updateVolume(0.5)} />
          ) : (
            <MuteButton onMute={() => updateVolume(0)} high={volume > 0.5} />
          )}
          <Slider
            value={volume}
            min={0}
            max={1}
            step={0.01}
            label={null}
            onChange={updateVolume}
            className="w-20"
          />
        </div>
      </div>
    </div>
  )
}
