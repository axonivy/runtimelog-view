import type { RuntimeLogEntryLsp } from '@axonivy/log-view-protocol';
import View from './View';
import './App.css';

function App(props: RuntimeLogEntryLsp) {
  return <View {...props} />;
}

export default App;
