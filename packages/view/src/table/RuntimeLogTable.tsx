import type { Level, RuntimeLogEntry } from '@axonivy/log-view-protocol';
import {
  Button,
  dataTableHelper,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  IvyIcon,
  selectRow,
  SortableHeader,
  Table,
  TableBody,
  TableGlobalFilter,
  TableResizableHeader,
  type DataTableFeatures
} from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { useTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterOptions } from './FilterOptions';
import { LogRow } from './LogRow';
import { SeverityIcon } from './SeverityIcon';

interface ViewProps {
  clearlogs: () => void;
  RuntimeLogEntry: RuntimeLogEntry[];
  onRowClick: (rowData: RuntimeLogEntry) => void;
}

export type LogLevel = Exclude<Level, 'OFF' | 'TRACE' | 'ALL'>;

export const levelPriority: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4
};

const { columnHelper, tableOptions } = dataTableHelper<RuntimeLogEntry>();

export const RuntimeLogTable = ({ RuntimeLogEntry, clearlogs, onRowClick }: ViewProps) => {
  const { t } = useTranslation();

  const [selectedLevel, setSelectedLevel] = useState<LogLevel>('DEBUG');
  const [isUserLog, setIsUserLog] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const projectList = useMemo(
    () => Array.from(new Set(RuntimeLogEntry.map(entry => entry.project as string).filter(project => project !== null && project !== ''))),
    [RuntimeLogEntry]
  );

  const filteredData = useMemo(() => {
    return RuntimeLogEntry.filter(entry => selectedProjects.length === 0 || selectedProjects.includes(entry.project as string))
      .filter(entry => levelPriority[entry.level as LogLevel] >= levelPriority[selectedLevel])
      .filter(entry => (isUserLog ? entry.category === 'USER' : true));
  }, [RuntimeLogEntry, selectedProjects, selectedLevel, isUserLog]);

  const columns = columnHelper.columns([
    columnHelper.accessor('level', {
      header: ({ column }) => <SortableHeader column={column} name={t('common.label.type')} />,
      cell: cell => (
        <Flex alignItems='center' gap={2}>
          <SeverityIcon level={cell.getValue() as LogLevel} />
          <span>{cell.getValue()}</span>
        </Flex>
      ),
      maxSize: 30,
      sortFn: (rowA, rowB) => {
        const levelA = levelPriority[rowA.getValue('level') as LogLevel] ?? Number.MIN_SAFE_INTEGER;
        const levelB = levelPriority[rowB.getValue('level') as LogLevel] ?? Number.MIN_SAFE_INTEGER;
        return levelA - levelB;
      }
    }),
    columnHelper.accessor('project', {
      header: ({ column }) => <SortableHeader column={column} name={t('common.label.project')} />,
      cell: cell => cell.getValue(),
      maxSize: 30
    }),
    columnHelper.accessor('message', {
      header: ({ column }) => <SortableHeader column={column} name={t('common.label.message')} />,
      cell: cell => (
        <div className='truncate' title={cell.getValue()}>
          {cell.getValue()}
        </div>
      )
    })
  ]);

  const table = useTable<DataTableFeatures, RuntimeLogEntry>({
    ...tableOptions,
    enableMultiRowSelection: false,
    data: filteredData,
    columns
  });

  const handleLogLevelChange = (checked: boolean, level: LogLevel) => {
    if (checked) {
      setSelectedLevel(level);
    }
  };

  return (
    <Flex direction='column' gap={2} className='h-full overflow-auto'>
      <Flex alignItems='center' gap={2}>
        <div className='flex-1'>
          <TableGlobalFilter table={table} placeholder={t('common.label.search')} />
        </div>
        <FilterOptions
          handleProjectFilterChange={setSelectedProjects}
          selectedProjects={selectedProjects}
          selectedLevel={selectedLevel}
          handleLogLevelChange={handleLogLevelChange}
          handleIsUserLogChange={setIsUserLog}
          isUserLog={isUserLog}
          projects={projectList}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='large' icon={IvyIcons.Dots} title={t('label.menu')} aria-label={t('label.menu')} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={clearlogs} className='text-error'>
                <IvyIcon icon={IvyIcons.Trash} />
                <span>{t('label.removeLogs')}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>

      <Table>
        <TableResizableHeader headerGroups={table.getHeaderGroups()} onClick={() => selectRow(table)} />
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <LogRow key={row.id} row={row} onRowClick={onRowClick} />
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
};
