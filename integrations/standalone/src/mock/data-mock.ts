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
  time: 0,
  level: LevelValues.INFO,
  message: 'Hello World',
  category: 'test',
  attributes: {
    'testlog.Person': {
      'address': {
        'address': 'Teststreet 1'
      },
      'birthday': 1234567890,
      'surname': 'Doe',
      'first name': 'John'
    }
  },
  processElement: '',
  request: '',
  throwableInformationMsg: '',
  timestamp: '',
  userDialogId: ''
};