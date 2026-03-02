import { Badge } from '@axonivy/ui-components';

export const FilterBadge = ({ filtersSelected, location }: { filtersSelected: number; location?: 'top-right' }) => {
  if (filtersSelected === 0) {
    return null;
  }
  return (
    <Badge
      size='xs'
      round
      className='data-[location=top-right]:absolute data-[location=top-right]:-top-0.5 data-[location=top-right]:-right-0.5'
      data-location={location}
    >
      {filtersSelected}
    </Badge>
  );
};
