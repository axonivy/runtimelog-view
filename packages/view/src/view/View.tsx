import './View.css';
import { Flex } from '@axonivy/ui-components';
import { RuntimeLogTable } from './../table/RuntimeLogTable';
import { useClient } from '../context/ClientContext';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { genQueryKey } from '../query/query-client';
import type { RuntimeLogContext } from '@axonivy/log-view-protocol';

export const View = (props: RuntimeLogContext) => {
  const context = useMemo(() => props, [props]);
  const client = useClient();

  const queryKeys = useMemo(() => {
    return {
      data: (context: RuntimeLogContext) => genQueryKey('data', context)
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
