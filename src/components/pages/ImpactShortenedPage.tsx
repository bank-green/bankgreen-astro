import type { SwitchSurveyContent } from '@lib/types/switch-survey'
import type { PrismicDocument } from '@prismicio/client'
import { SwitchSurveyCard } from '../forms/switch-survey'
import { ImpactLayout } from './ImpactLayout'

interface Props {
  page: PrismicDocument | null
  surveyContent: SwitchSurveyContent
}

export function ImpactShortenedPage({ page, surveyContent }: Props) {
  return (
    <ImpactLayout page={page} align="center">
      <SwitchSurveyCard content={surveyContent} />
    </ImpactLayout>
  )
}
