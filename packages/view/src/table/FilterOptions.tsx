import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Field,
  Flex,
  IvyIcon,
  Label
} from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { useTranslation } from 'react-i18next';
import { FilterBadge } from './FilterBadge';
import { FilterSerenities } from './FilterSerenities';
import { type LogLevel } from './RuntimeLogTable';

interface FilterOptionsProps {
  handleLogLevelChange: (checked: boolean, level: LogLevel) => void;
  handleIsUserLogChange: (checked: boolean) => void;
  isUserLog: boolean;
  selectedLevel: LogLevel;
  handleProjectFilterChange: (checked: string[]) => void;
  projects: string[];
  selectedProjects: string[];
}

export const FilterOptions = ({
  handleLogLevelChange,
  handleIsUserLogChange,
  handleProjectFilterChange,
  projects,
  selectedProjects,
  selectedLevel,
  isUserLog
}: FilterOptionsProps) => {
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Flex alignItems='center' className='relative'>
          <Button size='large' icon={IvyIcons.Configuration} title={t('label.filter')} aria-label={t('label.filter')} />
          <FilterBadge location='top-right' filtersSelected={selectedLevel === 'DEBUG' && selectedProjects.length === 0 ? 0 : 1} />
        </Flex>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>{t('label.filterBy')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuLabel>
            <Field direction='row' alignItems='center' gap={2}>
              <Checkbox checked={isUserLog} onCheckedChange={handleIsUserLogChange} />
              <Label>{t('label.userLog')}</Label>
            </Field>
          </DropdownMenuLabel>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger disabled={projects.length === 0}>
            <IvyIcon icon={IvyIcons.Folders} />
            {t('common.label.project')}
            <FilterBadge filtersSelected={selectedProjects.length} />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {projects.map(project => (
              <DropdownMenuCheckboxItem
                key={project}
                checked={selectedProjects.includes(project)}
                onCheckedChange={(checked: boolean) =>
                  handleProjectFilterChange(checked ? [...selectedProjects, project] : selectedProjects.filter(p => p !== project))
                }
                onSelect={e => e.preventDefault()}
              >
                {project}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <IvyIcon icon={IvyIcons.PriorityHigh} />
            {t('label.minLogLevel')}
            <FilterBadge filtersSelected={selectedLevel === 'DEBUG' ? 0 : 1} />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={selectedLevel} onValueChange={value => handleLogLevelChange(true, value as LogLevel)}>
              <FilterSerenities level='DEBUG' />
              <FilterSerenities level='INFO' />
              <FilterSerenities level='WARN' />
              <FilterSerenities level='ERROR' />
              <FilterSerenities level='FATAL' />
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem
          className='text-error'
          onSelect={() => {
            handleLogLevelChange(true, 'DEBUG');
            handleIsUserLogChange(false);
            handleProjectFilterChange([]);
          }}
        >
          <IvyIcon icon={IvyIcons.Reset} />
          {t('label.resetAllFilters')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
