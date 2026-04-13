import type { LogClient } from '@axonivy/log-view-protocol';
import type { ReactNode } from 'react';
import { createContext, use } from 'react';

export interface ClientContext {
  client: LogClient;
}

const ClientContext = createContext<ClientContext | undefined>(undefined);
export const useClient = (): LogClient => {
  const context = use(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientContext');
  }
  return context.client;
};

export const ClientContextProvider = ({ client, children }: { client: LogClient; children: ReactNode }) => {
  return <ClientContext value={{ client }}>{children}</ClientContext>;
};
