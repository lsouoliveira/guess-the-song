export const formatTime = (time: number) => {
  let hours = Math.floor(time / 3600)
  let minutes = Math.floor((time % 3600) / 60)
  let seconds = Math.floor(time % 60)

  const parts = [hours, minutes, seconds]

  if (!hours) {
    parts.shift()
  }

  return parts.map((unit) => String(unit).padStart(2, "0")).join(":")
}
