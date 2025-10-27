import { Emitter } from '@axonivy/jsonrpc';
import type { LogClient, RuntimeLogEntry } from '@axonivy/log-view-protocol';
import { generateMockData } from './data-mock';

export class LogClientMock implements LogClient {
  private onNewEntryEmitter = new Emitter<RuntimeLogEntry>();
  onNewEntry = this.onNewEntryEmitter.event;

  data(): Promise<RuntimeLogEntry[]> {
    return Promise.resolve(generateMockData());
  }

  clear(): void {}
}
