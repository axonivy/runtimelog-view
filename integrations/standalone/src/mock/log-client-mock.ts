import type { LogClient, LogView } from '@axonivy/log-view-protocol';
import { Emitter } from '@axonivy/jsonrpc';
import { data } from './data-mock';

export class LogClientMock implements LogClient {
  private logData: LogView = {
    context: { app: 'mock', pmv: 'mock', file: 'mock.f.json' },
    readonly: false,
    defaults: {},
    data: data,
    helpUrl: 'https://dev.axonivy.com'
  };

  protected onValidationChangedEmitter = new Emitter<void>();
  onValidationChanged = this.onValidationChangedEmitter.event;
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;

  data(): Promise<LogView> {
    return Promise.resolve(this.logData);
  }
}
