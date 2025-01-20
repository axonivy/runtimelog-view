/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { RuntimeLogEntryLsp } from './data/log';

export interface LogRequestTypes {
  data: [RuntimeLogEntryLsp, RuntimeLogEntryLsp];
}
