import { DropdownMenuRadioItem, Flex, IvyIcon } from '@axonivy/ui-components';
import { SeverityIcon } from './SeverityIcon';
import { IvyIcons } from '@axonivy/ui-icons';
import type { LogLevel } from './RuntimeLogTable';

interface FilterSerenitiesProps {
  selectedLevel: LogLevel;
  level: LogLevel;
}

export const FilterSerenities = ({ selectedLevel, level }: FilterSerenitiesProps) => {
  return (
    <DropdownMenuRadioItem className='radio-item' value={level}>
      <Flex className='severity' gap={2}>
        <SeverityIcon level={level} />
        {level}
      </Flex>
      {selectedLevel.toString() === level.toString() && <IvyIcon icon={IvyIcons.Check} />}
    </DropdownMenuRadioItem>
  );
};
