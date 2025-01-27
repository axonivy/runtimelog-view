import type { LogClient, RuntimeLogViewData } from '@axonivy/log-view-protocol';
import { Emitter } from '@axonivy/jsonrpc';
import  { data }from './data-mock';


export class LogClientMock implements LogClient {
  private logData: RuntimeLogViewData = {
    entries: [data.entries[0], data.entries[1], data.entries[2]]
  };

  protected onValidationChangedEmitter = new Emitter<void>();
  onValidationChanged = this.onValidationChangedEmitter.event;
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;

  data(): Promise<RuntimeLogViewData> {
    return Promise.resolve(this.logData);
  }
}
