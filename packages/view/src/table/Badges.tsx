import './Badges.css';

export const Badges = ({ filtersSelected, location }: { filtersSelected: number; location?: string }) => {
  if (filtersSelected === 0) {
    return null;
  }
  return <span className={`badges-circle ${location}`}>{filtersSelected}</span>;
};
