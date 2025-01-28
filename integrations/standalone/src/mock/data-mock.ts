import type { RuntimeLogViewData, Level } from '@axonivy/log-view-protocol';

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

export const data: RuntimeLogViewData = {
  entries: [
    {
      level: LevelValues.INFO,
      message: 'Process intermediate event',
      category: 'runtimelog',
      processElement: '',
      request: '',
      throwableInformationMsg: '',
      timestamp: 'Wed Jan 22 16:11:52 CET 2025',
      userDialogId: 'null'
    },
    {
      level: LevelValues.WARN,
      message: 'afdssfProcess intermediate event',
      category: 'runtimelog',
      processElement: '',
      request: '',
      throwableInformationMsg: '',
      timestamp: 'Wed Jan 22 16:11:52 CET 2025',
      userDialogId: 'null'
    },
    {
      level: LevelValues.ERROR,
      message: 'Process intermediate event',
      category: 'runtimelog',
      processElement: '',
      request: '',
      throwableInformationMsg: '',
      timestamp: 'Wed Jan 22 16:11:52 CET 2025',
      userDialogId: 'null'
    }

  ]
};