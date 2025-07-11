import { DropdownMenuRadioItem, Flex } from '@axonivy/ui-components';
import { type LogLevel } from './RuntimeLogTable';
import { SeverityIcon } from './SeverityIcon';

interface FilterSerenitiesProps {
  level: LogLevel;
}

export const FilterSerenities = ({ level }: FilterSerenitiesProps) => {
  return (
    <DropdownMenuRadioItem className='radio-item' value={level}>
      <Flex className='severity' alignItems='center' gap={2}>
        <SeverityIcon level={level} />
        {level}
      </Flex>
    </DropdownMenuRadioItem>
  );
};
