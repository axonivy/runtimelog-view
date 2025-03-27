import type { RuntimeLogViewData } from './data/log';

export interface LogRequestTypes {
  data: [RuntimeLogViewData, RuntimeLogViewData];
  clear: [];
}
