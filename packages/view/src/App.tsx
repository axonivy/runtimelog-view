import type { RuntimeLogViewData } from '@axonivy/log-view-protocol';
import { View } from './view/View';
import './App.css';

function App(props: RuntimeLogViewData) {
  return <View category={''} level={'OFF'} message={''} processElement={''} request={''} throwableInformationMsg={''} timestamp={''} userDialogId={''} {...props} />;
}

export default App;
