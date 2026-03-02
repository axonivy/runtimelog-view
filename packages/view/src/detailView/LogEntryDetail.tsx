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
      <span className='font-bold'>{label}</span>
      <span className='overflow-auto'>
        <pre>{value}</pre>
      </span>
    </Flex>
  );
};
