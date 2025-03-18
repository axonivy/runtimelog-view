import type { RuntimeLogEntryLsp } from '@axonivy/log-view-protocol';
import { Button, Flex, IvyIcon, Label, Table, TableBody, TableCell, TableRow } from '@axonivy/ui-components';
import './Detail.css';
import { IvyIcons } from '@axonivy/ui-icons';

interface ViewProps {
  RuntimeLogEntry: RuntimeLogEntryLsp;
  CloseDetailView: () => void;
}

export const Detail = ({ RuntimeLogEntry, CloseDetailView }: ViewProps) => {
  const logEntries = {
    Time: RuntimeLogEntry.timestamp,
    Request: RuntimeLogEntry.request,
    UserDialog: RuntimeLogEntry.userDialogId,
    Severity: RuntimeLogEntry.level,
    Category: RuntimeLogEntry.category,
    Project: RuntimeLogEntry.project,
    Message: RuntimeLogEntry.message
  };
  return (
    <Flex direction='column' gap={2} className='master-content-container'>
      <Flex direction='row' gap={2}>
        <Button className='close-detail-view' onClick={() => CloseDetailView()}>
          <IvyIcon icon={IvyIcons.Close} />
          <Label>Close</Label>
        </Button>
      </Flex>
      <Table aria-label='detail-view-table'>
        <TableBody>
          {Object.entries(logEntries).map(([key, value]) => (
            <TableRow className='detail-view-row' key={key}>
              <TableCell className='detail-view-key'>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
};
