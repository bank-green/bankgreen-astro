import type { Bank } from '@lib/banks'
import { COUNTRY_TO_CURRENCY } from '@lib/constants/switch-survey'
import { detectUserLocation } from '@lib/geolocation'
import { fetchAllBrandsWithCache, fetchBrandsByCountry } from '@lib/queries/brands'
import { submitSwitchedSurvey } from '@lib/queries/switch-survey'
import { useForm } from '@mantine/form'
import { useCallback, useRef, useState } from 'react'
import { buildExtendedSurveyHref } from './buildExtendedSurveyHref'
import { type SwitchedValues, switchedResolver } from './switch-survey-schemas'
import { markSwitchedSubmitted } from './switch-survey-store'

export interface SwitchedFormOptions {
  captchaToken?: string

  onResetCaptcha?: () => void

  onSuccess?: () => void
}

export function useSwitchedForm({
  captchaToken = '',
  onResetCaptcha,
  onSuccess,
}: SwitchedFormOptions = {}) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [banks, setBanks] = useState<Bank[]>([])
  const [banksLoading, setBanksLoading] = useState(false)

  const [extendedHref, setExtendedHref] = useState<string | null>(null)
  const [location, setLocation] = useState<{ country: string | null; region: string | null }>({
    country: null,
    region: null,
  })

  const form = useForm<SwitchedValues>({
    initialValues: {
      bankLeft: null,
      bankTo: null,
      currency: 'GBP',
      amount: '',
      email: '',
      isAgreeMarketing: false,
      isAgreeTerms: false,
    },
    validate: switchedResolver,
    validateInputOnBlur: true,
  })

  const { isDirty, setFieldValue } = form

  const hasLoadedBanks = useRef(false)

  // Not a mount effect: the dialog is in BaseLayout, so that would cost 1.24 MB per page view.
  const loadBanks = useCallback(() => {
    if (hasLoadedBanks.current) return
    hasLoadedBanks.current = true

    setBanksLoading(true)
    detectUserLocation()
      .then((detected) => {
        const currency = detected.country ? (COUNTRY_TO_CURRENCY[detected.country] ?? 'GBP') : 'GBP'
        if (!isDirty('currency')) {
          setFieldValue('currency', currency)
        }
        setLocation({ country: detected.country, region: detected.region })
        return detected.country ? fetchBrandsByCountry(detected.country) : fetchAllBrandsWithCache()
      })
      .catch(() => fetchAllBrandsWithCache().catch(() => []))
      .then(setBanks)
      .finally(() => setBanksLoading(false))
  }, [isDirty, setFieldValue])

  const handleSubmit = form.onSubmit(async (values) => {
    onResetCaptcha?.()
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const data = await submitSwitchedSurvey(values, { location, captchaToken })
      markSwitchedSubmitted()
      setExtendedHref(buildExtendedSurveyHref(values, data.uuid))
      onSuccess?.()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  })

  return {
    form,
    banks,
    banksLoading,
    loadBanks,
    extendedHref,
    handleSubmit,
    submitError,
    isSubmitting,
  }
}
