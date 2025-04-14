import type { RuntimeLogEntry } from '@axonivy/log-view-protocol';
import { Button, Flex } from '@axonivy/ui-components';
import './Detail.css';
import { IvyIcons } from '@axonivy/ui-icons';
import { LogEntryDetail } from './LogEntryDetail';

interface ViewProps {
  RuntimeLogEntry: RuntimeLogEntry;
  CloseDetailView: () => void;
}

export const Detail = ({ RuntimeLogEntry, CloseDetailView }: ViewProps) => {
  return (
    <Flex direction='column' gap={2} className='master-content-container detail-view'>
      <Flex direction='row' gap={2}>
        <Button onClick={() => CloseDetailView()} icon={IvyIcons.Close}>
          Close
        </Button>
      </Flex>

      <LogEntryDetail label='Time' value={RuntimeLogEntry.timestamp} />
      <LogEntryDetail label='Request' value={RuntimeLogEntry.request} />
      <LogEntryDetail label='User Dialog' value={RuntimeLogEntry.userDialogId} />

      <Flex gap={2} direction='row'>
        <LogEntryDetail label='Level' value={RuntimeLogEntry.level} />
        <LogEntryDetail label='Category' value={RuntimeLogEntry.category} />
      </Flex>

      <LogEntryDetail label='Message' value={RuntimeLogEntry.message} />
      <LogEntryDetail label='Stack' value={RuntimeLogEntry.throwableInformationMsg} />
    </Flex>
  );
};
