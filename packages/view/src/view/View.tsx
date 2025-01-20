import type { RuntimeLogEntryLsp } from '@axonivy/log-view-protocol';

export const View = (props: RuntimeLogEntryLsp) => {
  return (
    <div>
      <h1>Hello World </h1>
      {props.message}
    </div>
  );
};
