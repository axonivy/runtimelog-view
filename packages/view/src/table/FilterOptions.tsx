import {
  BasicCheckbox,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@axonivy/ui-components';

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
          <BasicCheckbox label='Show only User Logs' />
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
