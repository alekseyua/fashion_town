import React, { useEffect, useState } from 'react';
import Text from '../Text';
import { FetcherList, dataStates } from '@garpix/fetcher';
import Button from '../../Views/Button';
import Container from '../../Views/Container';
import InformationViews from '../../Views/InformationViews';
import classNames from 'classnames';
import Breadcrumbs from '../../Views/Breadcrumbs';
import Title from '../../Views/Title';
import Pagination from '../../Views/Pagination';
import ReviewsCard from '../ReviewsCard';
import FiltersReviewsHome from '../../Views/FiltersReviewsHome';
import { v4 } from 'uuid';
import api from '../../api';
import Select from '../../Views/Select';
import CheckBox from '../../Views/CheckBox';
import qs from 'qs';
import { GxModal } from '@garpix/garpix-web-components-react';
import ModalContentViews from '../../Views/ModalContentViews';
import AddReview from '../../components/AddReview';
import styleModal from '../../Views/ModalCreator/modalCreator.module.scss';

const apiContent = api.contentApi;

const ReviewsPageComponent = ({ breadcrumbs, title, location, profile, insta_link }) => {
  const [modalStates, setModalStates] = useState({
    showModalAddReview: false,
    resultAddReviewModal: false,
    successAddReview: false,
    content: null,
  });
  const initialFilters = [
    {
      id: v4(),
      title: 'О товаре',
      active: true,
    },
    {
      id: v4(),
      title: 'О сервисе',
      active: false,
    },
  ];
  const initialFetchFilters = {
    page: 1,
    page_size: 10,
    product__isnull: false,
    // ordering: 'created_at',
    // is_with_media: false,
    ...qs.parse(location.search),
  };
  const optionsSort = [
    {
      title: 'По дате публикации',
      value: 'created_at',
    },
    {
      title: 'По популярности',
      value: '-likes_count',
    },
    {
      title: 'По рейтингу автора',
      value: 'rating',
    },
  ];
  const [filters, setFilters] = useState(initialFilters);
  const setFiltersDec = (data, fp, loadData) => {
    setFilters(data);
    if (data[0].active) {
      loadData(1, { ...fp, product__isnull: false });
    } else {
      loadData(1, { ...fp, product__isnull: true });
    }
  };

  const openModalAddReview = () => {
    setModalStates({
      ...modalStates,
      showModalAddReview: true,
    });
  };
  const closeModal = () => {
    setModalStates({
      ...modalStates,
      showModalAddReview: false,
      resultAddReviewModal: false,
    });
  };

  const openModalFinalyAddReview = (type, content = null) => {
    setModalStates({
      ...modalStates,
      successAddReview: type,
      resultAddReviewModal: true,
      content,
    });
  };

  return (
    <Container>
      <GxModal
        onGx-after-hide={closeModal}
        open={modalStates.showModalAddReview}
        className={classNames({
          [styleModal['modal_creator']]: true,
          [styleModal['modal-review']]: true,
        })}
      >
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            {/* <ModalContentViews.CenterPosition> */}
              <AddReview.ModalAddReview
                openModalFinalyAddReview={openModalFinalyAddReview}
                profile={profile}
                canselationCallback={closeModal}
              />
            {/* </ModalContentViews.CenterPosition> */}
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      </GxModal>
      <GxModal
        onGx-after-hide={closeModal}
        open={modalStates.resultAddReviewModal}
        className={classNames({
          [styleModal['modal_creator']]: true,
          [styleModal['modal-success_error']]: true,
        })}
      >
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.SuccessOrError
                closeModal={closeModal}
                content={modalStates.content}
                success={modalStates.successAddReview}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      </GxModal>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <InformationViews.PaymentsConteiner>
        <Title variant={'information-payments__title'} type={'h1'}>
          {title}
        </Title>
        <InformationViews.HowToWrapper>
          <InformationViews.SubTitle variant={'subtitle-reviews'}>
            Заработай лайки за свой отзыв, чтобы получить дополнительную скидку! Больше отзывов
            можно посмотреть в нашем Instagram
          </InformationViews.SubTitle>
          <FetcherList
            isScrollTop={true}
            initFilter={initialFetchFilters}
            api={apiContent.getReviews}
          >
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
                  <InformationViews.WrapperButtonReviews>
                    <Button
                      onClick={openModalAddReview}
                      variant={'catalog-link-uppercase'}
                      data-cy={`buttonOpenModalAddReview`}
                    >
                      Добавить отзыв
                    </Button>
                    <Button
                      href={insta_link}
                      target="_blank"
                      variant={'catalog-link-transparent'}
                      data-cy={`buttonLinkTransprentInstagram`}
                    >
                      посмотреть Instagram
                    </Button>
                  </InformationViews.WrapperButtonReviews>

                  <FiltersReviewsHome
                    setFilters={(data) => setFiltersDec(data, filterParams, loadData)}
                    filters={filters}
                  />
                  <InformationViews.WrapperSortReviews>
                    <Select
                      variant={'select-theme__black-full'}
                      data-cy={`select-reviews-dropdown`}
                      placeholder={'Выберите вариант'}
                      options={optionsSort}
                      onGx-change={(e) => {
                        const value = e.target.value;
                        loadData(1, {
                          ...filterParams,
                          product__isnull: filterParams.product__isnull,
                          ordering: value,
                        });
                      }}
                    />
                    <CheckBox
                      checked={filterParams.is_with_media}
                      onClick={(e) => {
                        const value = e.target.checked;
                        loadData(1, { ...filterParams, is_with_media: !value });
                      }}
                      variant="input"
                      label={`С фотографиями (${results.length})`}
                      data-cy={`checkBoxInPageRewiews`}
                    />
                  </InformationViews.WrapperSortReviews>
                  {results.map((el) => {
                    return <ReviewsCard blockEnableView {...el} key={el.id} />;
                  })}
                  <InformationViews.PaginationsWrapper>
                    <Pagination activePage={activePage} count={count} params={filterParams} />
                  </InformationViews.PaginationsWrapper>
                  <InformationViews.PaginationsWrapper center>
                    {isNext ? <InformationViews.ShowMoreBtn allCount={count} currentCount={results.length} onClick={showMore} /> : null}
                  </InformationViews.PaginationsWrapper>
                </>
              );
            }}
          </FetcherList>
        </InformationViews.HowToWrapper>
      </InformationViews.PaymentsConteiner>
    </Container>
  );
};

export default React.memo(ReviewsPageComponent);
