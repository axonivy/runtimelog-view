import type { RuntimeLogViewData } from '@axonivy/log-view-protocol';

export const View = (props: RuntimeLogViewData) => {
  return (
    <div>
      <h1>Hello World </h1>
      {props.entries.map((entry, index) => (
        <div key={index}>
          <p>{entry.message}</p>
        </div>
      ))}
    </div>
  );
};
