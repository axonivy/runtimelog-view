import type { RuntimeLogViewData, RuntimeLogContext } from './data/log';

export interface LogRequestTypes {
  data: [RuntimeLogContext, RuntimeLogViewData];
}
