import type { RuntimeLogEntry } from '@axonivy/log-view-protocol';
import { SelectRow, TableCell } from '@axonivy/ui-components';
import { flexRender, type Row } from '@tanstack/react-table';

type LogRowProps = {
  row: Row<RuntimeLogEntry>;
  onRowClick: (rowData: RuntimeLogEntry) => void;
};

export const LogRow = ({ row, onRowClick }: LogRowProps) => {
  const tableCell = row.getVisibleCells().map(cell => (
    <TableCell style={{ padding: '6px' }} key={cell.id}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  ));

  return (
    <SelectRow id={row.index.toString()} row={row} onClick={() => onRowClick(row.original)}>
      {tableCell}
    </SelectRow>
  );
};
