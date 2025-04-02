import type { LogClient, Logs, Void } from '@axonivy/log-view-protocol';
import { Emitter } from '@axonivy/jsonrpc';
import { data } from './data-mock';

export class LogClientMock implements LogClient {
  private logData: Logs = {
    RuntimeLogEntry: data.RuntimeLogEntry,
    void: {} as Void
  };

  protected onValidationChangedEmitter = new Emitter<void>();
  onValidationChanged = this.onValidationChangedEmitter.event;
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;

  data(): Promise<Logs> {
    return Promise.resolve(this.logData);
  }

  clear(): void {
    this.logData.RuntimeLogEntry = [];
  }
}
