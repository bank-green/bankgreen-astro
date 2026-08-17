import type { PrismicDocument } from '@prismicio/client'
import { TypeformEmbed } from '../TypeformEmbed'
import { ImpactLayout } from './ImpactLayout'

const EXTENDED_TYPEFORM_ID = 'hNEXtoDS'

const HIDDEN_FIELDS = ['switched_from', 'switched_to', 'currency', 'amount', 'survey_id'] as const

interface Props {
  page: PrismicDocument | null
}

export function ImpactExtendedPage({ page }: Props) {
  return (
    <ImpactLayout page={page}>
      <TypeformEmbed formId={EXTENDED_TYPEFORM_ID} transitiveSearchParams={HIDDEN_FIELDS} />
    </ImpactLayout>
  )
}
