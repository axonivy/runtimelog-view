import type { Level, RuntimeLogEntryLsp, RuntimeLogViewData } from '@axonivy/log-view-protocol';
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
import { levels } from './SeverityIcon';

interface ViewProps {
  runtimeLogViewData: RuntimeLogViewData;
}

type LogLevel = Exclude<Level, 'OFF' | 'TRACE' | 'ALL'>;

const logLevelIcon = (level: LogLevel) => {
  const levelMap: Record<LogLevel, JSX.Element> = {
    DEBUG: levels[0].label,
    INFO: levels[1].label,
    WARN: levels[2].label,
    ERROR: levels[3].label,
    FATAL: levels[4].label
  };
  return levelMap[level] || levels[1].label;
};

export const RuntimeLogTable = ({ runtimeLogViewData }: ViewProps) => {
  const sort = useTableSort();
  const search = useTableGlobalFilter();

  const [selectedLevel, setSelectedLevel] = useState<LogLevel>('DEBUG');
  const [isUserLog, setIsUserLog] = useState(false);

  const filteredData = useMemo(() => {
    const levelPriority: Record<LogLevel, number> = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
      FATAL: 4
    };

    return runtimeLogViewData.entries
      .filter(entry => levelPriority[entry.level as LogLevel] >= levelPriority[selectedLevel])
      .filter(entry => (isUserLog ? entry.category === 'User' : true));
  }, [runtimeLogViewData.entries, selectedLevel, isUserLog]);

  const columns: Array<ColumnDef<RuntimeLogEntryLsp, string>> = [
    {
      accessorKey: 'level',
      header: ({ column }) => <SortableHeader column={column} name='Type' />,
      cell: cell => (
        <Flex gap={2}>
          {logLevelIcon(cell.getValue() as LogLevel)} {cell.getValue()}
        </Flex>
      ),
      maxSize: 30
    },
    {
      accessorKey: 'project',
      header: ({ column }) => <SortableHeader column={column} name='Project' />,
      cell: cell => cell.getValue(),
      maxSize: 30
    },
    {
      accessorKey: 'message',
      header: ({ column }) => <SortableHeader column={column} name='Message' />,
      cell: cell => cell.getValue()
    }
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
      setSelectedLevel(value.toString() as LogLevel);
    }
  };

  const handleIsUserLogChange = (checked: boolean) => {
    setIsUserLog(checked);
  };

  return (
    <Flex direction='column' gap={2} className='master-content-container'>
      <Flex gap={2}>
        <div className='search-field'> {search.filter}</div>
        <FilterOptions
          selectedLevel={selectedLevel}
          selectedLevels={levels}
          handleLogLevelChange={handleLogLevelChange}
          handelIsUserLogChange={handleIsUserLogChange}
        />
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
