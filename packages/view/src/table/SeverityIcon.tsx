import { IvyIcon } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import './SeverityIcon.css';
import type { Level } from '@axonivy/log-view-protocol';

type LogLevel = Exclude<Level, 'OFF' | 'TRACE' | 'ALL'>;

const icons: Record<LogLevel, IvyIcons> = {
  DEBUG: IvyIcons.Tool,
  INFO: IvyIcons.InfoCircle,
  WARN: IvyIcons.Caution,
  ERROR: IvyIcons.ErrorXMark,
  FATAL: IvyIcons.Error
};

export const SeverityIcon = ({ level }: { level: LogLevel }) => (
  <IvyIcon className={`log-level-icon ${level.toLowerCase()}`} icon={icons[level] || IvyIcons.InfoCircle} />
);
