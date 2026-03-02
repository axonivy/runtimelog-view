import type { RuntimeLogEntry } from '@axonivy/log-view-protocol';
import { ResizableGroup, ResizableHandle, ResizablePanel, useDefaultLayout } from '@axonivy/ui-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useClient } from '../context/ClientContext';
import { genQueryKey } from '../query/query-client';
import { Detail } from './../detailView/Detail';
import { RuntimeLogTable } from './../table/RuntimeLogTable';

export const View = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  const [selectedRow, setSelectedRow] = useState<RuntimeLogEntry | null>(null);
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({ groupId: 'log-view-resize', storage: localStorage });

  const queryKeys = useMemo(() => {
    return {
      data: () => genQueryKey('data')
    };
  }, []);

  const { data } = useQuery({
    queryKey: queryKeys.data(),
    queryFn: () => client.data(),
    structuralSharing: false
  });

  useEffect(() => {
    const disposable = client.onNewEntry(entry => {
      queryClient.setQueryData<RuntimeLogEntry[]>(queryKeys.data(), old => {
        if (!old) return [entry];
        return [...old, entry].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      });
    });

    return () => {
      disposable.dispose();
    };
  }, [client, queryClient, queryKeys]);

  const handleClearLogs = async () => {
    client.clear();
    queryClient.setQueryData(queryKeys.data(), []);
  };

  return (
    <ResizableGroup orientation='horizontal' defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged} className='gap-3'>
      <ResizablePanel id='log-view-main' defaultSize='75%' minSize='20%'>
        {data && <RuntimeLogTable clearlogs={handleClearLogs} RuntimeLogEntry={data} onRowClick={rowData => setSelectedRow(rowData)} />}
      </ResizablePanel>

      {selectedRow && (
        <>
          <ResizableHandle />
          <ResizablePanel id='log-view-detail' defaultSize='25%' minSize='20%'>
            <Detail entry={selectedRow} closeDetailView={() => setSelectedRow(null)} />
          </ResizablePanel>
        </>
      )}
    </ResizableGroup>
  );
};
