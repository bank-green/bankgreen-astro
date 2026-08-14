import type { SwitchedValues } from './switch-survey-schemas'

export function buildExtendedSurveyHref(values: SwitchedValues, surveyId?: string): string {
  const params = new URLSearchParams()
  if (values.bankLeft?.tag) params.set('switched_from', values.bankLeft.tag)
  if (values.bankTo?.tag) params.set('switched_to', values.bankTo.tag)
  if (values.currency) params.set('currency', values.currency)
  if (values.amount) params.set('amount', values.amount)
  if (surveyId) params.set('survey_id', surveyId)
  const qs = params.toString()
  return qs ? `/impact-extended#${qs}` : '/impact-extended'
}
