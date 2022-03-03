import React, { useEffect, useState } from 'react';
import { FetcherList, dataStates } from '@garpix/fetcher';
import api from '../../api';
import { useIntl } from 'react-intl';
import qs from 'qs';
import TextUnderTitle from '../../Views/TextUnderTitle';
import Pagination from '../../Views/Pagination';
import LivePhotosDetailsViews from '../../Views/LivePhotosDetailsViews';
import Breadcrumbs from '../../Views/Breadcrumbs';
import Title from '../../Views/Title';
import NewsDetailsViews from '../../Views/NewsDetailsViews';
import ModalContentViews from '../../Views/ModalContentViews';
import dayjs from '../../utils/dayjs';
import ModalLivePhotosDetails from './ModalLivePhotosDetails';

const apiContent = api.contentApi;

const LivePhotosDetailsComponent = ({
  breadcrumbs,
  location,
  created_at,
  setModalStates,
  site_configuration,
  album,
}) => {
  const [brands, setbrands] = useState([]);
  const { locale } = useIntl();

  const initialFilters = { page_size: 20, ...qs.parse(location.search) };
  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
    });
  };

  const openModal = ({ brand, imageSet, videoSet }) => {
    const fileList = imageSet;
    videoSet.forEach((element) => {
      fileList.push({
        ...element,
        type: 'video',
      });
    });
    setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalLivePhotosDetails
                brand={brand}
                imageSet={fileList}
                content={album.content}
                site_configuration={site_configuration}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-live_photo',
    });
  };

  useEffect(() => {
    apiContent
      .getBrands({ is_life_photos: true })
      .then((res) => {
        setbrands(res);
      })
      .catch((err) => {});
  }, []);
  return (
    <LivePhotosDetailsViews.Wrapper>
      {/* <Container> */}
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <NewsDetailsViews.Date date={dayjs(album.created_at).format('DD.MM.YYYY')} />
      <Title variant={'page__news-pink'} type={'h1'}>
        {album.brand.title}
      </Title>
      <TextUnderTitle variant={'live_photos-details-text'}>
        <div dangerouslySetInnerHTML={{ __html: album.content }}></div>
      </TextUnderTitle>
      <NewsDetailsViews.Line />
      <FetcherList isScrollTop={true} initFilter={initialFilters} api={apiContent.getLivePhotos}>
        {(data) => {
          const {
            count,
            results = [],
            activePage,
            loadData,
            showMore,
            status,
            filterParams,
            deleteElement,
            updateElement,
            deleteElementByKey,
            updateElementByKey,
            isNext,
            isPrev,
          } = data;
          return (
            <>
              {/* <LivePhotosDetailsViews.Filters
                filterParams={filterParams}
                loadData={loadData}
                brands={brands}
              /> */}
              <LivePhotosDetailsViews.PhotosContainer>
                {results.lendth === 0 ? <p>Ничего не найдено!</p> : null}
                {results.map((el, i) => {
                  return (
                    <LivePhotosDetailsViews.LivePhotosDetailsCard
                      key={el.id}
                      slug={el.slug}
                      brand={el.brand.title}
                      date={el.created_at}
                      image={el.image_thumb}
                      imageSet={el.livephotoimage_set}
                      videoSet={el.livephotovideo_set}
                      onClickCard={openModal}
                    />
                  );
                })}
              </LivePhotosDetailsViews.PhotosContainer>
              <Pagination activePage={activePage} count={count} params={filterParams} />
            </>
          );
        }}
      </FetcherList>
    </LivePhotosDetailsViews.Wrapper>
  );
};

export default React.memo(LivePhotosDetailsComponent);
