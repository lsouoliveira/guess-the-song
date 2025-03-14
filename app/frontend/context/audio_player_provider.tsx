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
  isPlaying: boolean
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

  const play = () => {
    audioRef.current?.play()
  }

  useEffect(() => {
    audioRef.current?.addEventListener("playing", handlePlaying)
    audioRef.current?.addEventListener("paused", handlePaused)

    return () => {
      audioRef.current?.removeEventListener("playing", handlePlaying)
      audioRef.current?.removeEventListener("paused", handlePaused)
    }
  }, [])

  const handlePlaying = () => {
    return setIsPlaying(true)
  }

  const handlePaused = () => {
    return setIsPlaying(false)
  }

  return (
    <AudioPlayerContext.Provider value={{ play, isPlaying, audioRef }}>
      {children}

      <audio ref={audioRef}>
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
