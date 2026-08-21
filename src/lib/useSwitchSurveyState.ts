import { submitPlanningSurvey } from '@lib/queries/switch-survey'
import type { Step } from '@lib/types/switch-survey'
import { useForm } from '@mantine/form'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { type PlanningValues, planningResolver } from './switch-survey-schemas'
import {
  initSurveyStore,
  isReturningVisitorStore,
  markPlanningSubmitted,
  markSurveySeen,
  showSurveyStore,
  startSurveyTriggers,
  stopSurveyTriggers,
} from './switch-survey-store'
import { type SwitchedFormOptions, useSwitchedForm } from './useSwitchedForm'

export function useSwitchSurveyState({
  captchaToken = '',
  onResetCaptcha,
}: Pick<SwitchedFormOptions, 'captchaToken' | 'onResetCaptcha'> = {}) {
  const isOpen = useStore(showSurveyStore)
  const isReturning = useStore(isReturningVisitorStore)
  const [step, setStep] = useState<Step>('question')

  const [planningError, setPlanningError] = useState<string | null>(null)
  const [planningSubmitting, setPlanningSubmitting] = useState(false)

  const switched = useSwitchedForm({
    captchaToken,
    onResetCaptcha,
    onSuccess: () => setStep('thanks'),
  })

  const planningForm = useForm<PlanningValues>({
    initialValues: { email: '', isAgreeMarketing: false, isAgreeTerms: false },
    validate: planningResolver,
    validateInputOnBlur: true,
  })

  useEffect(() => {
    initSurveyStore()
    startSurveyTriggers()
    return stopSurveyTriggers
  }, [])

  useEffect(() => {
    if (isOpen) setStep('question')
  }, [isOpen])

  const { loadBanks } = switched

  useEffect(() => {
    if (isOpen) loadBanks()
  }, [isOpen, loadBanks])

  const handleClose = () => markSurveySeen()

  const handleSubmitPlanning = planningForm.onSubmit(async (values) => {
    onResetCaptcha?.()
    setPlanningError(null)
    setPlanningSubmitting(true)
    try {
      await submitPlanningSurvey(values, captchaToken)
      markPlanningSubmitted()
      setStep('thanks')
    } catch (err) {
      setPlanningError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setPlanningSubmitting(false)
    }
  })

  const isPlanning = step === 'planning'

  return {
    isOpen,
    isReturning,
    step,
    setStep,
    submitError: isPlanning ? planningError : switched.submitError,
    isSubmitting: isPlanning ? planningSubmitting : switched.isSubmitting,
    banks: switched.banks,
    banksLoading: switched.banksLoading,
    switchedForm: switched.form,
    planningForm,
    handleClose,
    handleSubmitSwitched: switched.handleSubmit,
    handleCurrencyChange: switched.handleCurrencyChange,
    handleSubmitPlanning,
    extendedHref: switched.extendedHref,
  }
}
