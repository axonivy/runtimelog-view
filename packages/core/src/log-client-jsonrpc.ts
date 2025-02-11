import type { LogRequestTypes, LogClient, RuntimeLogContext } from '@axonivy/log-view-protocol';
import { BaseRpcClient, urlBuilder, createMessageConnection, Emitter, type Connection, type MessageConnection } from '@axonivy/jsonrpc';
import type { RuntimeLogViewData } from '@axonivy/log-view-protocol';

export class LogClientJsonRpc extends BaseRpcClient implements LogClient {
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;
  protected override setupConnection(): void {
    super.setupConnection();
    this.toDispose.push(this.onDataChangedEmitter);
  }

  data(context: RuntimeLogContext): Promise<RuntimeLogViewData> {
    return this.sendRequest('data', context);
  }

  sendRequest<K extends keyof LogRequestTypes>(command: K, args?: LogRequestTypes[K][0]): Promise<LogRequestTypes[K][1]> {
    return args === undefined ? this.connection.sendRequest(command) : this.connection.sendRequest(command, args);
  }

  public static webSocketUrl(url: string) {
    return urlBuilder(url, 'ivy-runtime-log-lsp');
  }

  public static async startClient(connection: Connection): Promise<LogClientJsonRpc> {
    return this.startMessageClient(createMessageConnection(connection.reader, connection.writer));
  }

  public static async startMessageClient(connection: MessageConnection): Promise<LogClientJsonRpc> {
    const client = new LogClientJsonRpc(connection);
    await client.start();
    return client;
  }
}
