import {
  Button,
  Checkbox,
  DropdownMenu,
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
import { type LogLevel } from './RuntimeLogTable';
import './FilterOptions.css';
import { FilterSerenities } from './FilterSerenities';

interface FilterOptionsProps {
  handleLogLevelChange: (checked: boolean, level: LogLevel) => void;
  handleIsUserLogChange: (checked: boolean) => void;
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
  selectedLevel
}: FilterOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='filter-button' variant='outline'>
          <Flex gap={2}>
            <IvyIcon icon={IvyIcons.Filter} />
            <Label>Filters</Label>
          </Flex>
          <IvyIcon icon={IvyIcons.Chevron} className='chevron' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Field className='filter-options' direction='row' alignItems='center' gap={2}>
            <IvyIcon icon={IvyIcons.FilterCog} />
            <Label>Show only User Logs</Label>
            <Checkbox onCheckedChange={handleIsUserLogChange} />
          </Field>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {projects.length > 0 && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IvyIcon className='icon-wrapper project' icon={IvyIcons.Folders} />
              <Label>Project</Label>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {projects.map((project, index) => (
                <DropdownMenuItem className='project-dropdown' key={index}>
                  <Label>{project}</Label>
                  <Checkbox
                    checked={selectedProjects.includes(project)}
                    onCheckedChange={(checked: boolean) => {
                      handleProjectFilterChange(checked ? [...selectedProjects, project] : selectedProjects.filter(p => p !== project));
                    }}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup className='radio-group' onValueChange={value => handleLogLevelChange(true, value as LogLevel)}>
          <FilterSerenities selectedLevel={selectedLevel} level='DEBUG' />
          <FilterSerenities selectedLevel={selectedLevel} level='INFO' />
          <FilterSerenities selectedLevel={selectedLevel} level='WARN' />
          <FilterSerenities selectedLevel={selectedLevel} level='ERROR' />
          <FilterSerenities selectedLevel={selectedLevel} level='FATAL' />
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
