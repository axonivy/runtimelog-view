import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@axonivy/ui-components';
import { RuntimeLogTable } from './../table/RuntimeLogTable';
import { Detail } from './../detailView/Detail';
import { useClient } from '../context/ClientContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { genQueryKey } from '../query/query-client';
import type { RuntimeLogEntry } from '@axonivy/log-view-protocol';

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
      <ResizablePanelGroup direction='horizontal' style={{ gap: 'var(--size-3)' }}>
        <ResizablePanel defaultSize={75} minSize={20}>
          {data && <RuntimeLogTable clearlogs={handleClearLogs} RuntimeLogEntry={data} onRowClick={rowData => setSelectedRow(rowData)} />}
        </ResizablePanel>

        {selectedRow && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={25} minSize={10}>
              <Detail RuntimeLogEntry={selectedRow} CloseDetailView={() => setSelectedRow(null)} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};
