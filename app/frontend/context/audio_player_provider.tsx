import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
  RefObject,
} from "react"
export type AudioPlayer = {
  play: () => void
  seek: (time: number) => void
  isPlaying: boolean
  isReady: boolean
  audioRef: RefObject<HTMLMediaElement | null>
}

export const AudioPlayerContext = createContext<AudioPlayer | null>(null)
export const AudioPlayerProvider = ({
  src,
  children,
}: {
  src: string
  children: ReactNode
}) => {
  const audioRef = useRef<HTMLMediaElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    audioRef.current?.addEventListener("playing", handlePlaying)
    audioRef.current?.addEventListener("paused", handlePaused)
    audioRef.current?.addEventListener("canplay", handleCanPlay)

    return () => {
      audioRef.current?.removeEventListener("playing", handlePlaying)
      audioRef.current?.removeEventListener("paused", handlePaused)
      audioRef.current?.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  const handlePlaying = () => {
    return setIsPlaying(true)
  }

  const handlePaused = () => {
    return setIsPlaying(false)
  }

  const handleCanPlay = () => {
    setIsReady(true)
  }

  const play = () => {
    audioRef.current?.play()
  }

  const seek = (time: number) => {
    audioRef.current?.fastSeek(time)
  }

  return (
    <AudioPlayerContext.Provider
      value={{ isPlaying, isReady, audioRef, play, seek }}
    >
      {children}

      <audio ref={audioRef} preload="auto">
        <source src={src} />
      </audio>
    </AudioPlayerContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioPlayerContext)

  if (!context) {
    throw "useAudio must be used within AudioPlayerProvider"
  }

  return context
}
