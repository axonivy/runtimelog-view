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
  IvyIcon,
  Label
} from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';

interface FilterOptionsProps {
  selectedLevel: string;
  selectedLevels: Array<{ label: JSX.Element; value: string }>;
  handleLogLevelChange: (checked: boolean, level: string) => void;
}

export const FilterOptions = ({ selectedLevel, selectedLevels, handleLogLevelChange }: FilterOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='filter-button' variant='outline'>
          Filters
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Field direction='row' alignItems='center' gap={2}>
            <IvyIcon icon={IvyIcons.InfoCircle} />
            <Label>Show only User Logs</Label>
            <Checkbox />
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
