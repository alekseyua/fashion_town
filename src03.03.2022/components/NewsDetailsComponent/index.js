import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../Views/Breadcrumbs';
import NewsDetailsViews from '../../Views/NewsDetailsViews';
import Title from '../../Views/Title';
import api from '../../api';
import Slider from './Slider';
import Button from '../../Views/Button';

const apiContent = api.contentApi;

const NewsDetailsComponent = ({
  breadcrumbs = [],
  created_at,
  content,
  title,
  id,
  page_type_news,
}) => {
  const [imageOrVideoSet, setImageOrVideoSet] = useState([]);
  const buttonBackHandle = () => {
    window.location.href = page_type_news;
  };
  // style
  useEffect(() => {
    apiContent.getNewsDetails(id).then((res) => {
      setImageOrVideoSet(res.media);
    });
  }, [id]);
  return (
    <React.Fragment>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <NewsDetailsViews.Wrapper>
        <NewsDetailsViews.Date date={created_at} />
        <Title variant={'news-details-page__title'} type={'h1'}>
          {title}
        </Title>
        <NewsDetailsViews.Line />
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        {imageOrVideoSet.length ? <Slider imageOrVideoSet={imageOrVideoSet} /> : null}
      </NewsDetailsViews.Wrapper>
      <NewsDetailsViews.WrapperBackBtn>
        <Button onClick={buttonBackHandle} variant={'catalog-link-uppercase'}>
          {'<'} назад к разделу
        </Button>
      </NewsDetailsViews.WrapperBackBtn>
    </React.Fragment>
  );
};

export default React.memo(NewsDetailsComponent);
