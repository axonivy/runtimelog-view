import './Badges.css';

export const Badges = ({ filtersSelected, location }: { filtersSelected: number; location?: 'top-right' }) => {
  if (filtersSelected === 0) {
    return null;
  }
  return (
    <span className='runtimelog-badges-circle' data-location={location}>
      {filtersSelected}
    </span>
  );
};
