import { CloseButton, Dialog, Group, MantineProvider, Text } from '@mantine/core'
import '@mantine/core/styles/Dialog.css'
import { markSurveySeen } from '@lib/switch-survey-store'
import type { Step, SwitchSurveyContent } from '@lib/types/switch-survey'
import { useSwitchSurveyState } from '@lib/useSwitchSurveyState'
import { useMediaQuery } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useTurnstile } from '@/lib/useTurnstile'
import { theme } from '@/styles/theme'
import { PlanningPanel } from './PlanningPanel'
import { QuestionPanel } from './QuestionPanel'
import { SwitchedPanel } from './SwitchedPanel'
import { ThanksPanel } from './ThanksPanel'

function PanelHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <Group className="justify-between border-gray-500 border-b px-4 py-3">
      <Text className="font-medium text-lg">{title}</Text>
      <CloseButton onClick={onClose} className="text-gray-500" />
    </Group>
  )
}

export function SwitchSurveyDialog({ content }: { content: SwitchSurveyContent }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const captcha = useTurnstile()

  const {
    isOpen,
    isReturning,
    step,
    setStep,
    submitError,
    isSubmitting,
    banks,
    banksLoading,
    switchedForm,
    planningForm,
    handleClose,
    handleSubmitSwitched,
    handleSubmitPlanning,
    extendedHref,
  } = useSwitchSurveyState({ captchaToken: captcha.token, onResetCaptcha: captcha.reset })

  const isMobile = useMediaQuery('(max-width: 767px)', false, { getInitialValueInEffect: false })

  if (!mounted) return null

  const stepTitles: Record<Step, string> = {
    question: content.titleQuestion,
    switched: content.titleSwitched,
    planning: content.titlePlanning,
    thanks: content.titleThanks,
  }

  const panels = (
    <>
      {step === 'question' && (
        <QuestionPanel
          isReturning={isReturning}
          onChoice={setStep}
          onClose={handleClose}
          content={content}
        />
      )}
      {step === 'switched' && (
        <SwitchedPanel
          form={switchedForm}
          onSubmit={handleSubmitSwitched}
          submitError={submitError}
          isSubmitting={isSubmitting}
          banks={banks}
          banksLoading={banksLoading}
          content={content}
          captchaWidget={captcha.widget}
          captchaPending={captcha.pending}
        />
      )}
      {step === 'planning' && (
        <PlanningPanel
          form={planningForm}
          onSubmit={handleSubmitPlanning}
          submitError={submitError}
          isSubmitting={isSubmitting}
          content={content}
          captchaWidget={captcha.widget}
          captchaPending={captcha.pending}
        />
      )}
      {step === 'thanks' && <ThanksPanel content={content} extendedHref={extendedHref} />}
    </>
  )

  return (
    <MantineProvider theme={theme}>
      <Dialog
        className={isMobile ? 'w-screen! max-w-[100vw]!' : undefined}
        opened={isOpen}
        onClose={handleClose}
        position={isMobile ? { bottom: 0, left: 0 } : { bottom: 24, right: 24 }}
        size={isMobile ? undefined : 360}
        radius={isMobile ? 0 : 'md'}
        withCloseButton={false}
      >
        <PanelHeader
          title={stepTitles[step]}
          onClose={step === 'thanks' ? markSurveySeen : handleClose}
        />
        {panels}
      </Dialog>
    </MantineProvider>
  )
}
