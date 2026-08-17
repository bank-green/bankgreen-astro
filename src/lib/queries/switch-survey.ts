import type { PlanningValues, SwitchedValues } from '@lib/switch-survey-schemas'

export interface SwitchedSubmitContext {
  location: { country: string | null; region: string | null }
  captchaToken: string
}

export interface SwitchedSurveyResponse {
  uuid?: string
  [key: string]: unknown
}

function turnstileToken(captchaToken: string): string | undefined {
  return captchaToken || (import.meta.env.DEV ? '1x00000000000000000000AA' : undefined)
}

async function postSurvey<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(
      res.status === 429
        ? 'Too many attempts. Please try again in a moment.'
        : 'Something went wrong. Please try again.'
    )
  }
  return (await res.json()) as T
}

export function submitSwitchedSurvey(
  values: SwitchedValues,
  { location, captchaToken }: SwitchedSubmitContext
): Promise<SwitchedSurveyResponse> {
  return postSurvey<SwitchedSurveyResponse>('/api/switch-survey', {
    moved_from_bank_name: values.bankLeft?.name,
    moved_from_tag: values.bankLeft?.tag,
    moved_to_bank_name: values.bankTo?.name,
    moved_to_tag: values.bankTo?.tag,
    amount: values.amount,
    currency: values.currency,
    email: values.email || undefined,
    is_agree_marketing: values.isAgreeMarketing,
    is_agree_privacy: values.isAgreeTerms,
    country: location.country || undefined,
    region: location.region || undefined,
    turnstile_token: turnstileToken(captchaToken),
  })
}

export function submitPlanningSurvey(
  values: PlanningValues,
  captchaToken: string
): Promise<unknown> {
  return postSurvey('/api/switch-survey-planning', {
    email: values.email,
    turnstile_token: turnstileToken(captchaToken),
    is_agree_privacy: values.isAgreeTerms,
    is_agree_marketing: values.isAgreeMarketing,
  })
}
