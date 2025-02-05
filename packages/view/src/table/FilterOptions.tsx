import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  Flex,
  IvyIcon,
  Label
} from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { useState } from 'react';

interface FilterOptionsProps {
  selectedLevel: string;
  selectedLevels: Array<{ label: JSX.Element; value: string }>;
  handleLogLevelChange: (checked: boolean, level: string) => void;
  handelIsUserLogChange: (checked: boolean) => void;
}

export const FilterOptions = ({ selectedLevel, selectedLevels, handleLogLevelChange, handelIsUserLogChange }: FilterOptionsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className='filter-button' variant='outline'>
          <Flex gap={2}>
            <IvyIcon icon={IvyIcons.Filter} />
            <Label>Filters</Label>
          </Flex>
          <IvyIcon icon={IvyIcons.Chevron} style={{ transform: open ? 'rotate(270deg)' : 'rotate(90deg)' }} />
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

        {selectedLevels.map(level => (
          <>
            <DropdownMenuSeparator aria-orientation='vertical' />
            <DropdownMenuCheckboxItem
              key={level.value}
              checked={selectedLevel === level.value}
              onCheckedChange={checked => handleLogLevelChange(checked, level.value)}
            >
              {level.label}
              {level.value}
            </DropdownMenuCheckboxItem>
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
