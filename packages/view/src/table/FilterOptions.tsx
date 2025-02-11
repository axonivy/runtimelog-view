import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  Flex,
  IvyIcon,
  Label
} from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { type LogLevel } from './RuntimeLogTable';
import { SeverityIcon } from './SeverityIcon';
import './FilterOptions.css';

interface FilterOptionsProps {
  handleLogLevelChange: (checked: boolean, level: LogLevel) => void;
  handelIsUserLogChange: (checked: boolean) => void;
  selectedLevel: LogLevel;
}

export const FilterOptions = ({ handleLogLevelChange, handelIsUserLogChange, selectedLevel }: FilterOptionsProps) => {
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
            <Checkbox onCheckedChange={handelIsUserLogChange} />
          </Field>
        </DropdownMenuLabel>

        <DropdownMenuSeparator aria-orientation='vertical' />
        <DropdownMenuRadioGroup className='radio-group' onValueChange={value => handleLogLevelChange(true, value as LogLevel)}>
          <DropdownMenuRadioItem className='radio-item' value='DEBUG'>
            <Flex gap={2}>
              <SeverityIcon level='DEBUG' />
              DEBUG
            </Flex>
            {selectedLevel === 'DEBUG' && <IvyIcon icon={IvyIcons.Check} />}
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator aria-orientation='vertical' />
          <DropdownMenuRadioItem className='radio-item' value='INFO'>
            <Flex gap={2}>
              <SeverityIcon level='INFO' />
              INFO
            </Flex>
            {selectedLevel === 'INFO' && <IvyIcon icon={IvyIcons.Check} />}
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator aria-orientation='vertical' />
          <DropdownMenuRadioItem className='radio-item' value='WARN'>
            <Flex gap={2}>
              <SeverityIcon level='WARN' />
              WARN
            </Flex>
            {selectedLevel === 'WARN' && <IvyIcon icon={IvyIcons.Check} />}
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator aria-orientation='vertical' />
          <DropdownMenuRadioItem className='radio-item' value='ERROR'>
            <Flex gap={2}>
              <SeverityIcon level='ERROR' />
              ERROR
            </Flex>
            {selectedLevel === 'ERROR' && <IvyIcon icon={IvyIcons.Check} />}
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator aria-orientation='vertical' />
          <DropdownMenuRadioItem className='radio-item' value='FATAL'>
            <Flex gap={2}>
              <SeverityIcon level='FATAL' />
              FATAL
            </Flex>
            {selectedLevel === 'FATAL' && <IvyIcon icon={IvyIcons.Check} />}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
