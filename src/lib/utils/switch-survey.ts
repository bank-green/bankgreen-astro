import type { SwitchSurveyContent } from '@lib/types/switch-survey'
import type { PrismicDocument, RichTextField } from '@prismicio/client'
import * as prismic from '@prismicio/client'

export const DEFAULT_SWITCH_SURVEY_CONTENT: SwitchSurveyContent = {
  titleQuestion: 'Quick question',
  titleSwitched: 'Tell us a bit more',
  titlePlanning: 'Mind if we follow up?',
  titleThanks: 'Thanks',
  questionNewText: 'Have you moved your money to a greener bank, or are you thinking about it?',
  questionNewBtnSwitched: "I've already switched",
  questionNewBtnPlanning: "I'm planning to",
  questionNewBtnClose: 'No, just looking',
  questionReturningText: 'Welcome back! Did you switch banks since your last visit?',
  questionReturningBtnSwitched: 'Yes, I switched',
  questionReturningBtnNotYet: 'Not yet',
  questionReturningBtnClose: 'No, just looking',
  switchedLabelBankLeft: 'Bank you left',
  switchedLabelBankTo: 'Bank you moved to',
  switchedLabelAmount: 'Amount moved',
  switchedPlaceholderAmount: 'e.g. 5,000',
  switchedLabelEmail: 'Email (optional)',
  switchedPlaceholderEmail: 'you@example.com',
  switchedBtnSubmit: 'Submit',
  planningText:
    "Drop your email and we'll send one short check-in in a few weeks to see if you switched. Nothing else.",
  planningLabelEmail: 'Your email (required)',
  planningPlaceholderEmail: 'you@example.com',
  planningBtnSubmit: 'Submit',
  thanksText: 'Thanks, that really helps.',
  extendedFormText: 'Maximise your impact by',
  extendedFormCta: 'telling us more',
  consentMarketing: 'I wish to receive more information via email from Bank.Green.',
  consentTermsText: "I have read and understood Bank.Green's",
  consentTermsLink: 'privacy policy',
}

export function extractContent(doc: PrismicDocument | null): SwitchSurveyContent {
  if (!doc?.data) return DEFAULT_SWITCH_SURVEY_CONTENT
  const d = doc.data
  const str = (field: string, fallback: string): string => {
    const v = d[field]
    if (!v) return fallback
    if (typeof v === 'string') return v
    return prismic.asText(v as RichTextField) || fallback
  }
  const defaults = DEFAULT_SWITCH_SURVEY_CONTENT
  return {
    titleQuestion: str('title_question', defaults.titleQuestion),
    titleSwitched: str('title_switched', defaults.titleSwitched),
    titlePlanning: str('title_planning', defaults.titlePlanning),
    titleThanks: str('title_thanks', defaults.titleThanks),
    questionNewText: str('question_new_text', defaults.questionNewText),
    questionNewBtnSwitched: str('question_new_btn_switched', defaults.questionNewBtnSwitched),
    questionNewBtnPlanning: str('question_new_btn_planning', defaults.questionNewBtnPlanning),
    questionNewBtnClose: str('question_new_btn_close', defaults.questionNewBtnClose),
    questionReturningText: str('question_returning_text', defaults.questionReturningText),
    questionReturningBtnSwitched: str(
      'question_returning_btn_switched',
      defaults.questionReturningBtnSwitched
    ),
    questionReturningBtnNotYet: str(
      'question_returning_btn_not_yet',
      defaults.questionReturningBtnNotYet
    ),
    questionReturningBtnClose: str(
      'question_returning_btn_close',
      defaults.questionReturningBtnClose
    ),
    switchedLabelBankLeft: str('switched_label_bank_left', defaults.switchedLabelBankLeft),
    switchedLabelBankTo: str('switched_label_bank_to', defaults.switchedLabelBankTo),
    switchedLabelAmount: str('switched_label_amount', defaults.switchedLabelAmount),
    switchedPlaceholderAmount: str(
      'switched_placeholder_amount',
      defaults.switchedPlaceholderAmount
    ),
    switchedLabelEmail: str('switched_label_email', defaults.switchedLabelEmail),
    switchedPlaceholderEmail: str('switched_placeholder_email', defaults.switchedPlaceholderEmail),
    switchedBtnSubmit: str('switched_btn_submit', defaults.switchedBtnSubmit),
    planningText: str('planning_text', defaults.planningText),
    planningLabelEmail: str('planning_label_email', defaults.planningLabelEmail),
    planningPlaceholderEmail: str('planning_placeholder_email', defaults.planningPlaceholderEmail),
    planningBtnSubmit: str('planning_btn_submit', defaults.planningBtnSubmit),
    thanksText: str('thanks_text', defaults.thanksText),
    extendedFormText: str('extended_form_text', defaults.extendedFormText),
    extendedFormCta: str('extended_form_cta', defaults.extendedFormCta),
    consentMarketing: str('consent_marketing', defaults.consentMarketing),
    consentTermsText: str('consent_terms_text', defaults.consentTermsText),
    consentTermsLink: str('consent_terms_link', defaults.consentTermsLink),
  }
}
