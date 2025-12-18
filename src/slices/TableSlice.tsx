/**
 * TableSlice - Renders tabular data from Prismic.
 *
 * Variations:
 * - default: Not rendered (appears to be unused in original)
 * - withHeaders: Table with column headers and rows
 */

import { renderRichText } from '@lib/prismicHelpers'
import { Table, Container, Image, Group } from '@mantine/core'
import type { RichTextField } from '@prismicio/client'

type TableSlice = {
  slice_type: 'table_slice'
  variation: string
  primary: {
    column_1_header?: string
    column_2_header?: string
    column_3_header?: string
    column_4_header?: string
  }
  items: Array<{
    icon?: { url?: string; name?: string }
    column_1?: RichTextField
    column_2?: RichTextField
    column_3?: RichTextField
    column_4?: RichTextField
  }>
}

interface Props {
  slice: TableSlice
}

export function TableSlice({ slice }: Props) {
  // Default variation is not rendered in the original
  if (slice.variation === 'default') {
    return null
  }

  const { column_1_header, column_2_header, column_3_header, column_4_header } = slice.primary

  const rows = slice.items.map((row, index) => {
    const typedRow = row

    return (
      <Table.Tr key={index}>
        {typedRow.column_1 && (
          <Table.Td>
            <Group gap="sm">
              {typedRow.icon?.url && (
                <Image src={typedRow.icon.url} alt={typedRow.icon.name || ''} w={40} h={40} />
              )}
              <div>{renderRichText(typedRow.column_1)}</div>
            </Group>
          </Table.Td>
        )}
        {typedRow.column_2 && <Table.Td>{renderRichText(typedRow.column_2)}</Table.Td>}
        {typedRow.column_3 && <Table.Td>{renderRichText(typedRow.column_3)}</Table.Td>}
        {typedRow.column_4 && <Table.Td>{renderRichText(typedRow.column_4)}</Table.Td>}
      </Table.Tr>
    )
  })

  return (
    <Container data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Table striped highlightOnHover>
        {(column_1_header || column_2_header || column_3_header || column_4_header) && (
          <Table.Thead>
            <Table.Tr>
              {column_1_header && <Table.Th>{column_1_header}</Table.Th>}
              {column_2_header && <Table.Th>{column_2_header}</Table.Th>}
              {column_3_header && <Table.Th>{column_3_header}</Table.Th>}
              {column_4_header && <Table.Th>{column_4_header}</Table.Th>}
            </Table.Tr>
          </Table.Thead>
        )}
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  )
}
