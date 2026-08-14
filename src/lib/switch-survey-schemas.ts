import type { Bank } from '@lib/banks'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'

export const isValidEmail = (email: string): boolean => z.regexes.email.test(email)

export const switchedSchema = z
  .object({
    bankLeft: z.custom<Bank | null>(
      (v) => v !== null && typeof (v as Bank).tag === 'string',
      'Required'
    ),
    bankTo: z.custom<Bank | null>(
      (v) => v !== null && typeof (v as Bank).tag === 'string',
      'Required'
    ),
    currency: z.string().min(1),
    amount: z.string().min(1, 'Required'),
    email: z.union([
      z.string().regex(z.regexes.email, { message: 'Please enter a valid email' }),
      z.literal(''),
    ]),
    isAgreeMarketing: z.boolean(),
    isAgreeTerms: z.boolean(),
  })
  .superRefine((values, ctx) => {
    if (isValidEmail(values.email) && !values.isAgreeTerms) {
      ctx.addIssue({
        code: 'custom',
        path: ['isAgreeTerms'],
        message: 'Please agree to the privacy policy.',
      })
    }
  })

export const planningSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(z.regexes.email, { message: 'Please enter a valid email' }),
  isAgreeMarketing: z.boolean(),
  isAgreeTerms: z.boolean().refine((val) => val === true, {
    message: 'Please agree to the privacy policy.',
  }),
})

export type SwitchedValues = z.infer<typeof switchedSchema>
export type PlanningValues = z.infer<typeof planningSchema>

// Keep out of useForm: a new resolver per render re-runs SwitchSurveyCard's loadBanks effect.
export const switchedResolver = zod4Resolver(switchedSchema)
export const planningResolver = zod4Resolver(planningSchema)
