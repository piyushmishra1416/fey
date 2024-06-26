import { useState, useEffect } from 'react';
import { fetchMarketNews } from '../utils/api';
import { Typography } from '@mui/material';

const cardClasses = ' text-white h-[20%]  rounded-lg space-y-2';
const boxClass = ''

const NewsCard = () => {
  const [news, setNews] = useState<any>(null); 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await fetchMarketNews();
        if (newsData && newsData.length > 0) {
          setNews(newsData[0]); 
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
          <div className={boxClass}>
            <Typography sx={{marginBottom: "100px"}}>{news.headline}</Typography>
            <Typography variant='body1' sx={{marginBottom: "10px", fontSize: "14px"}}>What you need to know today</Typography>
            <Typography variant='body1' sx={{fontWeight: "700", fontSize: "19px"}}>{news.summary}</Typography>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsCard;
