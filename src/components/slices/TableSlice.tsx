import { Table } from '@mantine/core';
import PrismicDOM from 'prismic-dom';

interface Props {
  primary?: {
    column_1_header?: string;
    column_2_header?: string;
    column_3_header?: string;
    column_4_header?: string;
  };
  items?: Array<{
    icon?: {
      url?: string;
      name?: string;
    };
    column_1?: any;
    column_2?: any;
    column_3?: any;
    column_4?: any;
  }>;
  variation?: string;
  slice_type?: string;
}

export function TableSlice({ primary, items = [], variation, slice_type }: Props) {
  // Default variation is not rendered
  if (variation === 'default') {
    return null;
  }

  const { column_1_header, column_2_header, column_3_header, column_4_header } = primary || {};
  const headers = [column_1_header, column_2_header, column_3_header, column_4_header].filter(Boolean);

  const rows = items.map((row) => [
    row.column_1 ? PrismicDOM.RichText.asHtml(row.column_1) : '',
    row.column_2 ? PrismicDOM.RichText.asHtml(row.column_2) : '',
    row.column_3 ? PrismicDOM.RichText.asHtml(row.column_3) : '',
    row.column_4 ? PrismicDOM.RichText.asHtml(row.column_4) : '',
  ]);

  return (
    <Table data-slice-type={slice_type} data-slice-variation={variation} striped highlightOnHover>
      {headers.length > 0 && (
        <Table.Thead>
          <Table.Tr>
            {column_1_header && <Table.Th>{column_1_header}</Table.Th>}
            {column_2_header && <Table.Th>{column_2_header}</Table.Th>}
            {column_3_header && <Table.Th>{column_3_header}</Table.Th>}
            {column_4_header && <Table.Th>{column_4_header}</Table.Th>}
          </Table.Tr>
        </Table.Thead>
      )}
      <Table.Tbody>
        {items.map((row, rowIndex) => (
          <Table.Tr key={rowIndex}>
            {row.column_1 && (
              <Table.Td>
                {row.icon?.url && <img src={row.icon.url} alt={row.icon.name || ''} style={{ marginRight: 8 }} />}
                {row.column_1 && <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(row.column_1) }} />}
              </Table.Td>
            )}
            {row.column_2 && (
              <Table.Td>
                <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(row.column_2) }} />
              </Table.Td>
            )}
            {row.column_3 && (
              <Table.Td>
                <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(row.column_3) }} />
              </Table.Td>
            )}
            {row.column_4 && (
              <Table.Td>
                <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(row.column_4) }} />
              </Table.Td>
            )}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
