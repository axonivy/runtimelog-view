import type { RuntimeLogViewData } from '@axonivy/log-view-protocol';
import React from 'react';
import './View.css';
import { Flex, ResizablePanel, ResizablePanelGroup } from '@axonivy/ui-components';
import { RuntimeLogTable } from './../table/RuntimeLogTable';

interface ViewProps {
  runtimeLogViewData: RuntimeLogViewData;
}

export const View: React.FC<ViewProps> = ({ runtimeLogViewData }) => {
  return (
    <>
      <ResizablePanelGroup direction='horizontal' style={{ height: `100vh` }}>
        <ResizablePanel defaultSize={75} minSize={50} className='master-panel'>
          <Flex className='panel-content-container master-container' direction='column'>
            <RuntimeLogTable runtimeLogViewData={runtimeLogViewData} />
          </Flex>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};
