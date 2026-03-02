import type { RuntimeLogEntry } from '@axonivy/log-view-protocol';
import { Button, Flex } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { useTranslation } from 'react-i18next';
import { LogEntryDetail } from './LogEntryDetail';

interface ViewProps {
  entry: RuntimeLogEntry;
  closeDetailView: () => void;
}

export const Detail = ({ entry, closeDetailView }: ViewProps) => {
  const { t } = useTranslation();
  return (
    <Flex direction='column' gap={4} className='h-full'>
      <Flex justifyContent='flex-end' direction='row' gap={2} className='shrink-0 basis-9.25 items-center'>
        <Button size='large' onClick={closeDetailView} icon={IvyIcons.Close} variant='outline'>
          {t('common.label.close')}
        </Button>
      </Flex>

      <Flex direction='column' gap={4} className='h-full overflow-auto'>
        <LogEntryDetail label={t('label.time')} value={entry.timestamp} />
        <LogEntryDetail label={t('label.request')} value={entry.request} />
        <LogEntryDetail label={t('label.userDialog')} value={entry.userDialogId} />

        <Flex gap={2} direction='row'>
          <LogEntryDetail label={t('label.level')} value={entry.level} className='grow' />
          <LogEntryDetail label={t('label.category')} value={entry.category} className='grow' />
        </Flex>

        <LogEntryDetail label={t('common.label.message')} value={entry.message} />
        <LogEntryDetail label={t('label.stack')} value={entry.throwableInformationMsg} />
      </Flex>
    </Flex>
  );
};
