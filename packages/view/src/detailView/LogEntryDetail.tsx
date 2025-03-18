import { Flex, Label } from '@axonivy/ui-components';

export const LogEntryDetail = ({ label, value }: { label: string; value: string }) => (
  <Flex gap={2} direction='column'>
    <Label className='detail-view-key'>{label}</Label>
    {value}
  </Flex>
);
