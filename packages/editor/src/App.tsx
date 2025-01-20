import View from './View';
import type { FormEditorProps } from '@axonivy/form-editor-protocol';
import './App.css';

function App(props: FormEditorProps) {
  return <View {...props} />;
}

export default App;
