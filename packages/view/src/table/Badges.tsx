import { Badge } from '@axonivy/ui-components';
import './Badges.css';

export const Badges = ({ filtersSelected, location }: { filtersSelected: number; location?: 'top-right' }) => {
  if (filtersSelected === 0) {
    return null;
  }
  return (
    <Badge size='xs' round className='runtimelog-badges-circle' data-location={location}>
      {filtersSelected}
    </Badge>
  );
};
