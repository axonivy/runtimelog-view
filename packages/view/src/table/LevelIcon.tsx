import { IvyIcon } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';

type Level = { label: JSX.Element; value: string };
export const levels: Level[] = [
  {
    label: <IvyIcon className='icon-wrapper debug' icon={IvyIcons.Tool} />,
    value: 'DEBUG'
  },
  {
    label: <IvyIcon className='icon-wrapper info' icon={IvyIcons.InfoCircle} />,
    value: 'INFO'
  },
  {
    label: <IvyIcon className='icon-wrapper warn' icon={IvyIcons.Caution} />,
    value: 'WARN'
  },
  {
    label: <IvyIcon className='icon-wrapper error' icon={IvyIcons.ErrorXMark} />,
    value: 'ERROR'
  },
  {
    label: <IvyIcon className='icon-wrapper fatal' icon={IvyIcons.Error} />,
    value: 'FATAL'
  }
];
