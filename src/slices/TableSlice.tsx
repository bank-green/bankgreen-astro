/**
 * TableSlice - Renders tabular data from Prismic.
 *
 * Variations:
 * - default: Not rendered (appears to be unused in original)
 * - withHeaders: Table with column headers and rows
 */
import type { Content } from "@prismicio/client";
import { renderRichText } from "@lib/prismicHelpers";

interface Props {
  slice: Content.TableSliceSlice;
}

export function TableSlice({ slice }: Props) {
  // Default variation is not rendered in the original
  if (slice.variation === "default") {
    return null;
  }

  const { column_1_header, column_2_header, column_3_header, column_4_header } = slice.primary as {
    column_1_header?: string;
    column_2_header?: string;
    column_3_header?: string;
    column_4_header?: string;
  };

  const headers = [column_1_header, column_2_header, column_3_header, column_4_header].filter(Boolean);

  return (
    <table data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      {headers.length > 0 && (
        <thead>
          <tr>
            {column_1_header && <th>{column_1_header}</th>}
            {column_2_header && <th>{column_2_header}</th>}
            {column_3_header && <th>{column_3_header}</th>}
            {column_4_header && <th>{column_4_header}</th>}
          </tr>
        </thead>
      )}
      <tbody>
        {slice.items.map((row, index) => {
          const typedRow = row as {
            icon?: { url?: string; name?: string };
            column_1?: Content.TextSliceSlice["primary"]["text"];
            column_2?: Content.TextSliceSlice["primary"]["text"];
            column_3?: Content.TextSliceSlice["primary"]["text"];
            column_4?: Content.TextSliceSlice["primary"]["text"];
          };

          return (
            <tr key={index}>
              {typedRow.column_1 && (
                <td>
                  {typedRow.icon?.url && <img src={typedRow.icon.url} alt={typedRow.icon.name || ""} />}
                  {renderRichText(typedRow.column_1)}
                </td>
              )}
              {typedRow.column_2 && <td>{renderRichText(typedRow.column_2)}</td>}
              {typedRow.column_3 && <td>{renderRichText(typedRow.column_3)}</td>}
              {typedRow.column_4 && <td>{renderRichText(typedRow.column_4)}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
