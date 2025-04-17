import type { RuntimeLogEntry, Level } from '@axonivy/log-view-protocol';

const LevelValues: { [key in Level]: Level } = {
  OFF: 'OFF',
  FATAL: 'FATAL',
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  TRACE: 'TRACE',
  ALL: 'ALL'
};

export const data: RuntimeLogEntry[] = [
  {
    level: LevelValues.INFO,
    message: 'Process intermediate event',
    category: 'USER',
    processElement: '',
    request: 'HTTP GET rest/approval.p.json/createApprovalViaREST.ivp(4.4.0.0)',
    throwableInformationMsg: '',
    timestamp: 'Wed Jan 22 16:11:52 CET 2025',
    userDialogId: '',
    project: 'Portal'
  },
  {
    level: LevelValues.WARN,
    message: 'Process intermediate event',
    category: 'USER',
    processElement: '',
    request: '',
    throwableInformationMsg: '',
    timestamp: 'Wed Jan 22 16:11:52 CET 2025',
    userDialogId: '',
    project: 'Runtime'
  },
  {
    level: LevelValues.ERROR,
    message: 'Process intermediate event',
    category: 'USER',
    processElement: '',
    request: '',
    throwableInformationMsg: '',
    timestamp: 'Wed Jan 22 16:11:52 CET 2025',
    userDialogId: '',
    project: 'Portal'
  },
  {
    level: LevelValues.ERROR,
    message: 'Process intermediate event',
    category: 'HTML_DIALOG',
    processElement: '',
    request: '',
    throwableInformationMsg: '',
    timestamp: 'Wed Jan 22 16:11:52 CET 2025',
    userDialogId: '',
    project: 'Conectivity'
  },
  {
    level: LevelValues.ERROR,
    message: 'Process intermediate event',
    category: 'HTML_DIALOG',
    processElement: '',
    request: '',
    throwableInformationMsg: '',
    timestamp: 'Wed Jan 22 16:11:52 CET 2025',
    userDialogId: '',
    project: 'Process-inspector'
  },
  {
    level: LevelValues.FATAL,
    message: 'Process intermediate event',
    category: 'USER',
    processElement: '',
    request: '',
    throwableInformationMsg: '',
    timestamp: 'Wed Jan 22 16:11:52 CET 2025',
    userDialogId: '',
    project: 'Engine'
  },
  {
    level: LevelValues.DEBUG,
    message: 'Process intermediate event',
    category: 'HTML_DIALOG',
    processElement: '',
    request: '',
    throwableInformationMsg: '',
    timestamp: 'Wed Jan 22 16:11:52 CET 2025',
    userDialogId: '',
    project: 'Neo'
  }
];
