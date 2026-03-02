import { DropdownMenuRadioItem, Flex } from '@axonivy/ui-components';
import { type LogLevel } from './RuntimeLogTable';
import { SeverityIcon } from './SeverityIcon';

interface FilterSerenitiesProps {
  level: LogLevel;
}

export const FilterSerenities = ({ level }: FilterSerenitiesProps) => {
  return (
    <DropdownMenuRadioItem value={level}>
      <Flex alignItems='center' gap={2}>
        <SeverityIcon level={level} />
        {level}
      </Flex>
    </DropdownMenuRadioItem>
  );
};
