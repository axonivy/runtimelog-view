import type { FormContext } from './data/form';
import type { FormEditor } from './data/form-data';

export interface Event<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}

export interface Disposable {
  dispose(): void;
}

export interface FormClient {
  data(context: FormContext): Promise<FormEditor>;
}
