import type { Level, RuntimeLogEntryLsp, RuntimeLogViewData } from '@axonivy/log-view-protocol';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  IvyIcon,
  Label,
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
import { SeverityIcon } from './SeverityIcon';
import { IvyIcons } from '@axonivy/ui-icons';

interface ViewProps {
  runtimeLogViewData: RuntimeLogViewData;
  clearlogs: () => void;
}

export type LogLevel = Exclude<Level, 'OFF' | 'TRACE' | 'ALL'>;

export const RuntimeLogTable = ({ runtimeLogViewData, clearlogs }: ViewProps) => {
  const sort = useTableSort();
  const search = useTableGlobalFilter();

  const [selectedLevel, setSelectedLevel] = useState<LogLevel>('DEBUG');
  const [isUserLog, setIsUserLog] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const projectList = useMemo(() => (
    Array.from(new Set(runtimeLogViewData.entries
      .map(entry => entry.project)
      .filter(project => project !== null && project !== '')
    ))
  ), [runtimeLogViewData.entries]);

  const filteredData = useMemo(() => {
    const levelPriority: Record<LogLevel, number> = {
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
      FATAL: 4
    };

    return runtimeLogViewData.entries
      .filter(entry => selectedProjects.length === 0 || selectedProjects.includes(entry.project))
      .filter(entry => levelPriority[entry.level as LogLevel] >= levelPriority[selectedLevel])
      .filter(entry => (isUserLog ? entry.category === 'User' : true));
  }, [runtimeLogViewData.entries, selectedLevel, isUserLog, selectedProjects]);

  const columns: Array<ColumnDef<RuntimeLogEntryLsp, string>> = [
    {
      accessorKey: 'level',
      header: ({ column }) => <SortableHeader column={column} name='Type' />,
      cell: cell => (
        <Flex className='severity' gap={2}>
          <SeverityIcon level={cell.getValue() as LogLevel} />
          <Label>{cell.getValue()}</Label>
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

  const handleLogLevelChange = (checked: boolean, level: LogLevel) => {
    if (checked) {
      setSelectedLevel(level);
    }
  };

  return (
    <Flex direction='column' gap={2} className='master-content-container'>
      <Flex gap={2}>
        <div className='search-field'>{search.filter}</div>
        <FilterOptions
          handleProjectFilterChange={setSelectedProjects}
          selectedProjects={selectedProjects}
          selectedLevel={selectedLevel}
          handleLogLevelChange={handleLogLevelChange}
          handleIsUserLogChange={setIsUserLog}
          projects={projectList}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <IvyIcon icon={IvyIcons.Dots} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={clearlogs} className='dropdown-delete'>
                <IvyIcon icon={IvyIcons.Trash} />
                <Label>Delete All</Label>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>

      <Table style={{ overflowX: 'unset' }}>
        <TableResizableHeader headerGroups={table.getHeaderGroups()} onClick={() => selectRow(table)} />
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <LogRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
};
