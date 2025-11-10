import { App, ClientContextProvider, QueryProvider, initQueryClient } from '@axonivy/log-view';
import { HotkeysProvider, ThemeProvider } from '@axonivy/ui-components';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { initTranslation } from './i18n';
import './index.css';
import { LogClientMock } from './mock/log-client-mock';

export function start() {
  const logClient = new LogClientMock();
  const queryClient = initQueryClient();

  const root = document.getElementById('root');
  if (root === null) {
    throw new Error('Root element not found');
  }
  initTranslation();
  createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider defaultTheme='system'>
        <ClientContextProvider client={logClient}>
          <QueryProvider client={queryClient}>
            <HotkeysProvider initiallyActiveScopes={['global']}>
              <App />
            </HotkeysProvider>
          </QueryProvider>
        </ClientContextProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

start();
