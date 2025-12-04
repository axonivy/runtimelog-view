import { Flex } from '@axonivy/ui-components';

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
      <span className='detail-view-key'>{label}</span>
      <span className='detail-view-value'>
        <pre>{value}</pre>
      </span>
    </Flex>
  );
};
