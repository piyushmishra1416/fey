// NewsCard.tsx

import { useState, useEffect } from 'react';
import { fetchMarketNews } from '../utils/api';

const cardClasses = 'bg-zinc-800 text-white p-6 rounded-lg space-y-4';
const textClasses = 'text-zinc-400 text-sm';
const titleClasses = 'text-xl font-bold';

const NewsCard = () => {
  const [news, setNews] = useState<any>(null); // Type any can be replaced with a specific type for news data

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await fetchMarketNews();
        if (newsData && newsData.length > 0) {
          setNews(newsData[0]); // Assuming you want to display the latest news item
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className={cardClasses}>
      {news && (
        <>
          <div className=''>
            <p className={textClasses}>{news.headline}</p>
            <h1 className={titleClasses}>{news.summary}</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsCard;
