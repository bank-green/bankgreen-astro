import type { Step, SwitchSurveyContent } from '@lib/types/switch-survey'
import { Stack, Text } from '@mantine/core'
import { CheckIcon, ClockCountdownIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { ChoiceButton } from './ChoiceButton'

export function QuestionPanel({
  isReturning,
  onChoice,
  onClose,
  content,
}: {
  isReturning: boolean
  onChoice: (step: Step) => void
  onClose: () => void
  content: SwitchSurveyContent
}) {
  return (
    <Stack className="gap-2 p-4">
      {!isReturning ? (
        <>
          <Text className="mb-1 text-sm">{content.questionNewText}</Text>
          <ChoiceButton
            icon={<CheckIcon size={16} weight="bold" />}
            onClick={() => onChoice('switched')}
          >
            {content.questionNewBtnSwitched}
          </ChoiceButton>
          <ChoiceButton
            icon={<ClockCountdownIcon size={16} />}
            onClick={() => onChoice('planning')}
          >
            {content.questionNewBtnPlanning}
          </ChoiceButton>
          <ChoiceButton icon={<MagnifyingGlassIcon size={16} />} onClick={onClose}>
            {content.questionNewBtnClose}
          </ChoiceButton>
        </>
      ) : (
        <>
          <Text className="mb-1 text-sm">{content.questionReturningText}</Text>
          <ChoiceButton
            icon={<CheckIcon size={16} weight="bold" />}
            onClick={() => onChoice('switched')}
          >
            {content.questionReturningBtnSwitched}
          </ChoiceButton>
          <ChoiceButton icon={<ClockCountdownIcon size={16} />} onClick={onClose}>
            {content.questionReturningBtnNotYet}
          </ChoiceButton>
          <ChoiceButton icon={<MagnifyingGlassIcon size={16} />} onClick={onClose}>
            {content.questionReturningBtnClose}
          </ChoiceButton>
        </>
      )}
    </Stack>
  )
}
