import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { type LogLevel } from './RuntimeLogTable';
import './FilterOptions.css';
import { FilterSerenities } from './FilterSerenities';
import { useTranslation } from 'react-i18next';

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
        <Button className='filter-button' variant='outline'>
          <Flex gap={2}>
            <IvyIcon icon={IvyIcons.Filter} />
            <Label>{t('label.filter')}</Label>
          </Flex>
          <IvyIcon icon={IvyIcons.Chevron} className='chevron' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Field className='filter-options' direction='row' alignItems='center' gap={2}>
            <IvyIcon icon={IvyIcons.FilterCog} />
            <Label>{t('label.userlog')}</Label>
            <Checkbox checked={isUserLog} onCheckedChange={handleIsUserLogChange} />
          </Field>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger disabled={projects.length === 0}>
            <Label>{t('common.label.project')}</Label>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {projects.map(project => (
              <DropdownMenuCheckboxItem
                className='project-dropdown'
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

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>{t('label.minloglevel')}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              className='radio-group'
              value={selectedLevel}
              onValueChange={value => handleLogLevelChange(true, value as LogLevel)}
            >
              <FilterSerenities level='DEBUG' />
              <FilterSerenities level='INFO' />
              <FilterSerenities level='WARN' />
              <FilterSerenities level='ERROR' />
              <FilterSerenities level='FATAL' />
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
