import { QuizItem } from "@/types/quiz_items"

export const QuizItemDetailAlert = ({ quizItem }: { quizItem: QuizItem }) => {
  if (quizItem.status !== "completed" && quizItem.status !== "skipped") {
    return false
  }

  const message = () => {
    if (completed()) {
      return "You guessed correctly"
    }

    return "Skipped"
  }

  const completed = () => {
    return quizItem.status === "completed"
  }

  const dividerClasses = () => {
    return `absolute top-1/2 left-0 h-[1px] ${completed() ? "bg-green-300" : "bg-red-300"} -translate-y-1/2 w-full -z-1`
  }

  const headingClasses = () => {
    return `bg-white ${completed() ? "text-green-700" : "text-red-700"} px-2 font-semibold`
  }

  return (
    <div>
      <div className="flex justify-center relative">
        <div className={dividerClasses()}></div>
        <div className={headingClasses()}>{message()}</div>
      </div>
    </div>
  )
}
