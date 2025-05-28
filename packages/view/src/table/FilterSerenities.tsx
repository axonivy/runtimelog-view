import { DropdownMenuRadioItem, Flex } from '@axonivy/ui-components';
import { SeverityIcon } from './SeverityIcon';
import { type LogLevel } from './RuntimeLogTable';

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
