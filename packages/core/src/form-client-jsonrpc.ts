import type { FormRequestTypes, FormContext, FormClient, FormEditor } from '@axonivy/form-editor-protocol';
import { BaseRpcClient, urlBuilder, createMessageConnection, Emitter, type Connection, type MessageConnection } from '@axonivy/jsonrpc';

export class FormClientJsonRpc extends BaseRpcClient implements FormClient {
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;
  protected override setupConnection(): void {
    super.setupConnection();
    this.toDispose.push(this.onDataChangedEmitter);
  }

  data(context: FormContext): Promise<FormEditor> {
    return this.sendRequest('data', { ...context });
  }

  sendRequest<K extends keyof FormRequestTypes>(command: K, args?: FormRequestTypes[K][0]): Promise<FormRequestTypes[K][1]> {
    return args === undefined ? this.connection.sendRequest(command) : this.connection.sendRequest(command, args);
  }

  public static webSocketUrl(url: string) {
    return urlBuilder(url, 'ivy-form-lsp');
  }

  public static async startClient(connection: Connection): Promise<FormClientJsonRpc> {
    return this.startMessageClient(createMessageConnection(connection.reader, connection.writer));
  }

  public static async startMessageClient(connection: MessageConnection): Promise<FormClientJsonRpc> {
    const client = new FormClientJsonRpc(connection);
    await client.start();
    return client;
  }
}
