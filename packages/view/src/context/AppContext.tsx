import { EMPTY_FORM, type LogContext, type LogData } from '@axonivy/log-view-protocol';
import { createContext, useContext, type SetStateAction, type Dispatch, useState, useEffect } from 'react';
import { useReadonly, type useHistoryData } from '@axonivy/ui-components';

type UI = {
  properties: boolean;
  helpPaddings: boolean;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
};

const DEFAULT_UI: UI = { properties: true, helpPaddings: true, deviceMode: 'desktop' };

export const useUiState = () => {
  const readonly = useReadonly();
  const [ui, setUi] = useState(DEFAULT_UI);
  useEffect(() => {
    if (readonly) {
      setUi(old => ({ ...old, helpPaddings: false, components: false }));
    }
  }, [readonly]);
  return { ui, setUi };
};

export type AppContext = {
  data: LogData;
  selectedElement?: string;
  setSelectedElement: Dispatch<SetStateAction<string | undefined>>;
  ui: UI;
  setUi: Dispatch<SetStateAction<UI>>;
  context: LogContext;
  history: ReturnType<typeof useHistoryData<LogData>>;
  helpUrl: string;
};

export const appContext = createContext<AppContext>({
  data: EMPTY_FORM,
  setSelectedElement: () => {},
  ui: DEFAULT_UI,
  setUi: () => {},
  context: { app: '', pmv: '', file: '' },
  history: { push: () => {}, undo: () => {}, redo: () => {}, canUndo: false, canRedo: false },
  helpUrl: ''
});

export const AppProvider = appContext.Provider;

export const useAppContext = () => {
  return useContext(appContext);
};
