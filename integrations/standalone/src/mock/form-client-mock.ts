import type { FormClient, FormEditor } from '@axonivy/form-editor-protocol';
import { Emitter } from '@axonivy/jsonrpc';
import { data } from './data-mock';

export class FormClientMock implements FormClient {
  private formData: FormEditor = {
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

  data(): Promise<FormEditor> {
    return Promise.resolve(this.formData);
  }
}
