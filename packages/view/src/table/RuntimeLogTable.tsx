import type { RuntimeLogEntryLsp, RuntimeLogViewData } from '@axonivy/log-view-protocol';
import {
  Flex,
  IvyIcon,
  selectRow,
  SortableHeader,
  Table,
  TableBody,
  TableResizableHeader,
  useTableGlobalFilter,
  useTableSort
} from '@axonivy/ui-components';
import { getCoreRowModel, type ColumnDef } from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import { LogRow } from './LogRow';
import { IvyIcons } from '@axonivy/ui-icons';

interface ViewProps {
  runtimeLogViewData: RuntimeLogViewData;
}

const logLevelIcon = (level: string) => {
  switch (level) {
    case 'INFO':
      return <IvyIcon icon={IvyIcons.InfoCircle} />;
    case 'WARN':
      return <IvyIcon icon={IvyIcons.Caution} />;
    case 'ERROR':
      return <IvyIcon icon={IvyIcons.ErrorXMark} />;
    case 'FATAL':
      return <IvyIcon icon={IvyIcons.InfoCircle} />;
    case 'DEBUG':
      return <IvyIcon icon={IvyIcons.Tool} />;
    default:
      return <IvyIcon icon={IvyIcons.Error} />;
  }
};

export const RuntimeLogTable = ({ runtimeLogViewData }: ViewProps) => {
  const sort = useTableSort();
  const globalFilter = useTableGlobalFilter();

  const columns: Array<ColumnDef<RuntimeLogEntryLsp, string>> = [
    {
      accessorKey: 'level',
      header: ({ column }) => <SortableHeader column={column} name='Type' />,
      cell: cell => (
        <div>
          {logLevelIcon(cell.getValue())} {cell.getValue()}
        </div>
      ),
      minSize: 50
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <SortableHeader column={column} name='Project' />,
      cell: cell => <div>{cell.getValue()}</div>
    },
    {
      accessorKey: 'message',
      header: ({ column }) => <SortableHeader column={column} name='Message' />,
      cell: cell => <div>{cell.getValue()}</div>
    }
  ];

  const table = useReactTable({
    enableMultiRowSelection: true,
    ...sort.options,
    ...globalFilter.options,
    data: runtimeLogViewData.entries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      ...sort.tableState,
      ...globalFilter.tableState
    }
  });

  return (
    <Flex direction='column' gap={4} className='master-content-container' onClick={() => selectRow(table)}>
      {globalFilter.filter}
      <Table style={{ overflowX: 'unset' }}>
        <TableResizableHeader headerGroups={table.getHeaderGroups()} onClick={() => selectRow(table)} />
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <LogRow key={row.id} row={row} isReorderable={table.getState().sorting.length === 0} />
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
};
