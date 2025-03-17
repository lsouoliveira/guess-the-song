import { QuizItem } from "@/types/quiz_items"
import { Link } from "@inertiajs/react"
import { Button } from "@mantine/core"
import { IconArrowRight, IconArrowLeft, IconTrophy } from "@tabler/icons-react"

const NextQuizItemLink = ({ href, show }: { href?: string; show: boolean }) => {
  if (!show) {
    return
  }

  return (
    <Link href={href || ""}>
      <Button rightSection={<IconArrowRight size={14} />}>Next song</Button>
    </Link>
  )
}

const PreviousQuizItemLink = ({
  href,
  show,
}: {
  href?: string
  show: boolean
}) => {
  if (!show) {
    return
  }

  return (
    <Link href={href || ""}>
      <Button leftSection={<IconArrowLeft size={14} />}>Previous song</Button>
    </Link>
  )
}

const ResultsLink = ({ href, show }: { href?: string; show: boolean }) => {
  if (!show) {
    return
  }

  return (
    <Link href={href || ""}>
      <Button color="green" leftSection={<IconTrophy size={14} />}>
        See your Results
      </Button>
    </Link>
  )
}

export const QuizItemDetailSecondaryActions = ({
  quizItem,
}: {
  quizItem: QuizItem
}) => {
  if (quizItem.status !== "completed" && quizItem.status !== "skipped") {
    return false
  }

  const isNextQuizItemLinkVisible = (): boolean => {
    return quizItem.status !== "ongoing" && quizItem.next_item_id != null
  }

  const isPreviousQuizItemLinkVisible = (): boolean => {
    return quizItem.previous_item_id != null
  }

  const isResultsLinkVisible = () => {
    return quizItem.game.status == "completed" && quizItem.next_item_id == null
  }

  const nextItemPath = `/games/${quizItem.game.slug}/items/${quizItem.next_item_id}`
  const previousItemPath = `/games/${quizItem.game.slug}/items/${quizItem.previous_item_id}`
  const resultsLink = `/games/${quizItem.game.slug}`

  return (
    <div className="flex w-full justify-between">
      <div>
        <PreviousQuizItemLink
          href={previousItemPath}
          show={isPreviousQuizItemLinkVisible()}
        />
      </div>
      <div>
        <NextQuizItemLink
          href={nextItemPath}
          show={isNextQuizItemLinkVisible()}
        />
        <ResultsLink href={resultsLink} show={isResultsLinkVisible()} />
      </div>
    </div>
  )
}
