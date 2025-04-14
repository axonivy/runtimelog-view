import { Flex, Label } from '@axonivy/ui-components';

interface LogEntryDetailProps {
  label: string;
  value: string;
}
export const LogEntryDetail = ({ label, value }: LogEntryDetailProps) => {
  if (!value) {
    return null;
  }
  return (
    <Flex gap={2} direction='column'>
      <Label className='detail-view-key'>{label}</Label>
      {value}
    </Flex>
  );
};
