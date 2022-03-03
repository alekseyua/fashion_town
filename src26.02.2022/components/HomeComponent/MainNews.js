import React from 'react';
import MainNewsLayout from '../../Views/MainNewsLayout';

const MainNews = ({ news = [], news_url = '' }) => {
  return <MainNewsLayout news={news} news_url={news_url} />;
};
export default React.memo(MainNews);
