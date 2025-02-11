import type { RuntimeLogContext} from '@axonivy/log-view-protocol';
import { View } from './view/View';
import './App.css';

function App(props: RuntimeLogContext) {
  return <View {...props} />;
}

export default App;
