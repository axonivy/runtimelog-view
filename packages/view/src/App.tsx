import View from './View';
import type { LogViewProps } from '@axonivy/log-view-protocol';
import './App.css';

function App(props: LogViewProps) {
  return <View {...props} />;
}

export default App;
