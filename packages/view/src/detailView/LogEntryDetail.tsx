import { Flex } from '@axonivy/ui-components';

interface LogEntryDetailProps {
  label: string;
  value: string;
  className?: string;
}
export const LogEntryDetail = ({ label, value, className }: LogEntryDetailProps) => {
  if (!value) {
    return null;
  }
  return (
    <Flex gap={1} direction='column' className={className}>
      <span className='detail-view-key'>{label}</span>
      <span className='detail-view-value'>
        <pre>{value}</pre>
      </span>
    </Flex>
  );
};
