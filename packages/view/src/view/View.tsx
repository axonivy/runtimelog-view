import type { RuntimeLogEntry } from '@axonivy/log-view-protocol';
import { ResizableGroup, ResizableHandle, ResizablePanel } from '@axonivy/ui-components';
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
    <div className='runtimelog-view'>
      <ResizableGroup orientation='horizontal' style={{ gap: 'var(--size-3)' }}>
        <ResizablePanel defaultSize='75%' minSize='20%'>
          {data && <RuntimeLogTable clearlogs={handleClearLogs} RuntimeLogEntry={data} onRowClick={rowData => setSelectedRow(rowData)} />}
        </ResizablePanel>

        {selectedRow && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize='25%' minSize='20%'>
              <Detail RuntimeLogEntry={selectedRow} CloseDetailView={() => setSelectedRow(null)} />
            </ResizablePanel>
          </>
        )}
      </ResizableGroup>
    </div>
  );
};
