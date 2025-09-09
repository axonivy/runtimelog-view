import type { Level } from '@axonivy/log-view-protocol';
import { Badge, IvyIcon } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ComponentProps } from 'react';

type LogLevel = Exclude<Level, 'OFF' | 'TRACE' | 'ALL'>;

const icons: Record<LogLevel, IvyIcons> = {
  DEBUG: IvyIcons.Tool,
  INFO: IvyIcons.InfoCircle,
  WARN: IvyIcons.Caution,
  ERROR: IvyIcons.ErrorXMark,
  FATAL: IvyIcons.Error
} as const;

const variant: Record<LogLevel, ComponentProps<typeof Badge>['variant']> = {
  DEBUG: 'secondary',
  INFO: 'blue',
  WARN: 'orange',
  ERROR: 'red',
  FATAL: 'purple'
} as const;

export const SeverityIcon = ({ level }: { level: LogLevel }) => (
  <Badge size='s' round variant={variant[level]}>
    <IvyIcon icon={icons[level] || IvyIcons.InfoCircle} />
  </Badge>
);
