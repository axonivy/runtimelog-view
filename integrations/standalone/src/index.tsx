import './index.css';
import { App, ClientContextProvider, QueryProvider, initQueryClient } from '@axonivy/log-view';
import { LogClientJsonRpc } from '@axonivy/log-view-core';
import { ThemeProvider, toast, Toaster, Spinner, Flex, HotkeysProvider } from '@axonivy/ui-components';
import { webSocketConnection, type Connection } from '@axonivy/jsonrpc';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { webSocketBase, themeParam } from './url-helper';
import { initTranslation } from './i18n';

export async function start() {
  const server = webSocketBase();
  const theme = themeParam();
  const queryClient = initQueryClient();
  const rootElement = document.getElementById('root');
  if (rootElement === null) {
    throw new Error('Root element not found');
  }
  const root = createRoot(rootElement);
  initTranslation();

  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme={theme}>
        <Flex style={{ height: '100%' }} justifyContent='center' alignItems='center'>
          <Spinner size='large' />
        </Flex>
        <Toaster closeButton={true} position='bottom-left' />
      </ThemeProvider>
    </React.StrictMode>
  );

  const initialize = async (connection: Connection) => {
    const client = await LogClientJsonRpc.startClient(connection);
    root.render(
      <React.StrictMode>
        <ThemeProvider defaultTheme={theme}>
          <ClientContextProvider client={client}>
            <QueryProvider client={queryClient}>
              <HotkeysProvider initiallyActiveScopes={['global']}>
                <App />
              </HotkeysProvider>
            </QueryProvider>
          </ClientContextProvider>
          <Toaster closeButton={true} position='bottom-left' />
        </ThemeProvider>
      </React.StrictMode>
    );
    return client;
  };

  const reconnect = async (connection: Connection, oldClient: LogClientJsonRpc) => {
    await oldClient.stop();
    return initialize(connection);
  };

  await webSocketConnection<LogClientJsonRpc>(LogClientJsonRpc.webSocketUrl(server)).listen({
    onConnection: initialize,
    onReconnect: reconnect,
    logger: { log: console.log, info: toast.info, warn: toast.warning, error: toast.error }
  });
}

start();
