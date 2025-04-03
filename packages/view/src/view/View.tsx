import './View.css';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@axonivy/ui-components';
import { RuntimeLogTable } from './../table/RuntimeLogTable';
import { Detail } from './../detailView/Detail';
import { useClient } from '../context/ClientContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
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

  const handleClearLogs = async () => {
    client.clear();
    queryClient.setQueryData(queryKeys.data(), { entries: [] });
  };

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel defaultSize={75} minSize={20}>
        {data && <RuntimeLogTable clearlogs={handleClearLogs} RuntimeLogEntry={data} onRowClick={rowData => setSelectedRow(rowData)} />}
      </ResizablePanel>

      <ResizableHandle />
      {selectedRow && (
        <ResizablePanel defaultSize={25} minSize={10}>
          <Detail RuntimeLogEntry={selectedRow} CloseDetailView={() => setSelectedRow(null)} />
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  );
};
