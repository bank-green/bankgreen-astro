import { markSurveySeen } from '@lib/switch-survey-store'
import type { SwitchSurveyContent } from '@lib/types/switch-survey'
import { useSwitchedForm } from '@lib/useSwitchedForm'
import { Group, Paper, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTurnstile } from '@/lib/useTurnstile'
import { SwitchedPanel } from './SwitchedPanel'
import { ThanksPanel } from './ThanksPanel'

export function SwitchSurveyCard({ content }: { content: SwitchSurveyContent }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)

    markSurveySeen()
  }, [])

  const captcha = useTurnstile()

  const [step, setStep] = useState<'switched' | 'thanks'>('switched')

  const {
    form,
    banks,
    banksLoading,
    loadBanks,
    submitError,
    isSubmitting,
    extendedHref,
    handleSubmit,
  } = useSwitchedForm({
    captchaToken: captcha.token,
    onResetCaptcha: captcha.reset,
    onSuccess: () => setStep('thanks'),
  })

  useEffect(() => {
    loadBanks()
  }, [loadBanks])

  if (!mounted) return null

  return (
    <Paper className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-white/10 bg-bgInverse text-sm text-textInverse shadow-2xl">
      <Group className="justify-between border-gray-500 border-b px-4 py-3">
        <Text className="font-medium text-lg">
          {step === 'thanks' ? content.titleThanks : content.titleSwitched}
        </Text>
      </Group>
      {step === 'switched' ? (
        <SwitchedPanel
          form={form}
          onSubmit={handleSubmit}
          submitError={submitError}
          isSubmitting={isSubmitting}
          banks={banks}
          banksLoading={banksLoading}
          content={content}
          captchaWidget={captcha.widget}
          captchaPending={captcha.pending}
        />
      ) : (
        <ThanksPanel content={content} extendedHref={extendedHref} />
      )}
    </Paper>
  )
}
