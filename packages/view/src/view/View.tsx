import './View.css';
import { Flex } from '@axonivy/ui-components';
import { RuntimeLogTable } from './../table/RuntimeLogTable';
import { useClient } from '../context/ClientContext';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { genQueryKey } from '../query/query-client';
import type { RuntimeLogViewData } from '@axonivy/log-view-protocol';

export const View = (props: RuntimeLogViewData) => {
  const [context] = useState(props);
  const client = useClient();

  const queryKeys = useMemo(() => {
    return {
      data: (context: RuntimeLogViewData) => genQueryKey('data', context)
    };
  }, []);

  const { data } = useQuery({
    queryKey: queryKeys.data(context),
    queryFn: () => client.data(context),
    structuralSharing: false
  });

  return (
    <Flex className='panel-content-container master-container' direction='column'>
      {data && <RuntimeLogTable runtimeLogViewData={data} />}
    </Flex>
  );
};
