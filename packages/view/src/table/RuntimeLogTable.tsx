import type { RuntimeLogEntryLsp, RuntimeLogViewData } from '@axonivy/log-view-protocol';
import {
  Flex,
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
import { useMemo, useState } from 'react';
import { FilterOptions } from './FilterOptions';
import './RuntimeLogTable.css';
import './LevelIcon.css';
import { levels as levels } from './LevelIcon';

interface ViewProps {
  runtimeLogViewData: RuntimeLogViewData;
}

const logLevelIcon = (level: string) => {
  switch (level) {
    case 'DEBUG':
      return levels[0].label;
    case 'INFO':
      return levels[1].label;
    case 'WARN':
      return levels[2].label;
    case 'ERROR':
      return levels[3].label;
    case 'FATAL':
      return levels[4].label;
    default:
      return levels[1].label;
  }
};

export const RuntimeLogTable = ({ runtimeLogViewData }: ViewProps) => {
  const sort = useTableSort();
  const search = useTableGlobalFilter();

  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');

  const filteredData = useMemo(() => {
    if (selectedLevel === 'ALL') return runtimeLogViewData.entries;
    return runtimeLogViewData.entries.filter(entry => entry.level === selectedLevel);
  }, [runtimeLogViewData.entries, selectedLevel]);

  const columns: Array<ColumnDef<RuntimeLogEntryLsp, string>> = [
    {
      accessorKey: 'level',
      header: ({ column }) => <SortableHeader column={column} name='Type' />,
      cell: cell => (
        <Flex gap={2}>
          {logLevelIcon(cell.getValue())} {cell.getValue()}
        </Flex>
      ),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <SortableHeader column={column} name='Project' />,
      cell: cell => cell.getValue()
    },
    {
      accessorKey: 'message',
      header: ({ column }) => <SortableHeader column={column} name='Message' />,
      cell: cell => cell.getValue(),
    },
  ];

  const table = useReactTable({
    enableMultiRowSelection: false,
    ...sort.options,
    ...search.options,
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      ...sort.tableState,
      ...search.tableState
    }
  });

  const handleLogLevelChange = (checked: boolean, value: string) => {
    if (checked) {
      setSelectedLevel(value);
    }
  };

  return (
    <Flex direction='column' gap={2} className='master-content-container'>
      <Flex gap={2}>
        <div style={{ width: '100%' }}> {search.filter}</div>
        <FilterOptions selectedLevel={selectedLevel} selectedLevels={levels} handleLogLevelChange={handleLogLevelChange} />
      </Flex>

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
