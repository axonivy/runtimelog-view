import type { RuntimeLogEntryLsp, Level } from '@axonivy/log-view-protocol';

const LevelValues: { [key in Level]: Level } = {
  OFF: "OFF",
  FATAL: "FATAL",
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG",
  TRACE: "TRACE",
  ALL: "ALL"
};

export const data: RuntimeLogEntryLsp = {
  id: '1',
  level: LevelValues.INFO,
  message: 'Hello World',
  category: 'test',
  processElement: '',
  request: '',
  throwableInformationMsg: '',
  timestamp: '',
  userDialogId: ''
};