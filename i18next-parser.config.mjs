export default {
  defaultNamespace: 'runtime-log-view',
  defaultValue: '__MISSING_TRANSLATION__',
  keepRemoved: false,
  locales: ['en', 'de'],
  output: 'src/translation/log-view/$LOCALE.json',
  pluralSeparator: '_',
  input: ['src/**/*.ts', 'src/**/*.tsx'],
  verbose: false,
  sort: true
};
