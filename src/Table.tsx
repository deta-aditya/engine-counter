import { ReactNode } from "react";

type Column<T extends Record<string, unknown>, U extends keyof T = keyof T> = {
  key: U;
  title: string;
  headClassName?: string;
  cellClassName?: string;
  render?: (datum: T[U], data: T) => ReactNode;
};

export const Table = <T extends Record<string, unknown>>(props: {
  className?: string;
  columns: Array<Column<T>>;
  dataset: T[];
}) => {
  return (
    <table className={props.className}>
      <thead>
        <tr>
          {props.columns.map(column => (
            <th key={`th-${String(column.key)}`} className={column.headClassName}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.dataset.map((data, idx) => (
          <tr key={`tr-${idx}`}>
            {Object.entries(data).map(([key, datum]) => {
              const columnInfo = props.columns.find(column => column.key === key);

              return (
                <td key={`td-${idx}-${key}`} className={columnInfo?.cellClassName}>
                  {columnInfo?.render?.(datum as T[keyof T], data) || String(datum)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
};
