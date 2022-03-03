import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import ReviewsCard from '../../../components/ReviewsCard';
import Text from '../../../components/Text';
import { FetcherList, dataStates } from '@garpix/fetcher';
import InformationViews from '../../InformationViews';
import MoreLink from '../../../Views/MoreLink';
import AddReview from '../../../components/AddReview';
import api from '../../../api';
import style from '../../ModalContentViews/styles/index.module.scss';

const contentApi = api.contentApi;

const ReviewsLeftSide = ({
  reviews_count,
  profileId,
  product,
  openModalFinalyAddReview,
  canselationCallback,
}) => {
  return (
    <FetcherList
      isScrollTop={true}
      initFilter={{ page_size: 5, product: product }}
      api={contentApi.getReviews}
    >
      {(data) => {
        const {
          count,
          activePage,
          results = [],
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
          reload,
        } = data;
        return (
          <div className={style['productreviews__left-side-wrapper']}>
            {reviews_count ? (
              <h2 className={style['productreviews__title']}>
                <Text text={'reviews'} /> ({reviews_count})
              </h2>
            ) : null}

            <ul className={style['productreviews__reviews-list']}>
              {results.map((el) => {
                delete el['product_url'];
                return (
                  <li key={el.id} className={style['productreviews__item']}>
                    <ReviewsCard disabledLinkToProduct {...el} profileId={profileId} />
                  </li>
                );
              })}
            </ul>
            {results.length === count ? null : (
              <InformationViews.ShowMoreBtn
                onClick={showMore}
                allCount={count}
                currentCount={results.length}
              />
            )}
            <div className={style['productreviews__reviews-list-mb']}></div>

            <AddReview.FormAddReview
              product={product}
              profile={profileId}
              canselationCallback={canselationCallback}
              openModalFinalyAddReview={openModalFinalyAddReview}
            />
          </div>
        );
      }}
    </FetcherList>
  );
};

export default React.memo(ReviewsLeftSide);
