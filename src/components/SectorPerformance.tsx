

const SECTOR_DATA = [
  { name: 'All sectors', change: '+0.88%' },
  { name: 'Industrials', change: '+1.66%' },
  { name: 'Communication Services', change: '+1.55%' },
  { name: 'Technology', change: '+1.08%' },
  { name: 'Consumer Cyclical', change: '+1.02%' },
  { name: 'Financial', change: '+0.99%' },
  { name: 'Healthcare', change: '+0.84%' },
  { name: 'Real Estate', change: '+0.69%' },
  { name: 'Basic Materials', change: '+0.65%' },
  { name: 'Utilities', change: '+0.57%' },
  { name: 'Energy', change: '-0.05%' },
  { name: 'Consumer Defensive', change: '-0.12%' }
];

const cardClasses = 'bg-zinc-900 text-white p-4 rounded-lg max-w-md mx-auto';
const titleClasses = 'text-lg font-semibold mb-4';
const sectorClasses = 'flex justify-between mb-2';
const changeClasses = 'text-green-500';

const SectorPerformance = () => {
  return (
    <div className={cardClasses}>
      <h2 className={titleClasses}>Sector Performance</h2>
      {SECTOR_DATA.map((sector, index) => (
        <div key={index} className={sectorClasses}>
          <span className={sector.change.includes('+') ? changeClasses : 'text-red-500'}>
            {sector.name}
          </span>
          <span className={sector.change.includes('+') ? changeClasses : 'text-red-500'}>
            {sector.change}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SectorPerformance;
