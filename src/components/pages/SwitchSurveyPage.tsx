import type { PrismicDocument } from '@prismicio/client'
import { TypeformEmbed } from '../TypeformEmbed'
import { ImpactLayout } from './ImpactLayout'

interface Props {
  page: PrismicDocument | null
}

export function SwitchSurveyPage({ page }: Props) {
  return (
    <ImpactLayout page={page}>
      <TypeformEmbed />
    </ImpactLayout>
  )
}
