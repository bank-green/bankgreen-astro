export type Step = 'question' | 'switched' | 'planning' | 'thanks'

export interface SwitchSurveyContent {
  titleQuestion: string
  titleSwitched: string
  titlePlanning: string
  titleThanks: string
  questionNewText: string
  questionNewBtnSwitched: string
  questionNewBtnPlanning: string
  questionNewBtnClose: string
  questionReturningText: string
  questionReturningBtnSwitched: string
  questionReturningBtnNotYet: string
  questionReturningBtnClose: string
  switchedLabelBankLeft: string
  switchedLabelBankTo: string
  switchedLabelAmount: string
  switchedPlaceholderAmount: string
  switchedLabelEmail: string
  switchedPlaceholderEmail: string
  switchedBtnSubmit: string
  planningText: string
  planningLabelEmail: string
  planningPlaceholderEmail: string
  planningBtnSubmit: string
  thanksText: string
  extendedFormText: string
  extendedFormCta: string

  consentMarketing: string

  consentTermsText: string

  consentTermsLink: string
}
