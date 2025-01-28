import { SelectRow, TableCell } from '@axonivy/ui-components';
import { flexRender, type Row } from '@tanstack/react-table';
import type { RuntimeLogEntryLsp } from '@axonivy/log-view-protocol';

type LogRowProps = {
  row: Row<RuntimeLogEntryLsp>;
  isReorderable: boolean;
};

export const LogRow = ({ row }: LogRowProps) => {
  const tableCell = row
    .getVisibleCells()
    .map(cell => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>);

  const commonProps = { id: row.index.toString(), row };
  return (
    <>
      <SelectRow {...commonProps}>{tableCell}</SelectRow>
    </>
  );
};
