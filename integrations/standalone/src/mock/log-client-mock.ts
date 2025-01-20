import type { LogClient, RuntimeLogEntryLsp } from '@axonivy/log-view-protocol';
import { Emitter } from '@axonivy/jsonrpc';

export class LogClientMock implements LogClient {
  private logData: RuntimeLogEntryLsp = {
    category: '',
    level: 'OFF',
    message: '',
    processElement: '',
    request: '',
    throwableInformationMsg: '',
    timestamp: '',
    userDialogId: ''
  };

  protected onValidationChangedEmitter = new Emitter<void>();
  onValidationChanged = this.onValidationChangedEmitter.event;
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;

  data(): Promise<RuntimeLogEntryLsp> {
    return Promise.resolve(this.logData);
  }
}
