import { useState } from 'react';
import LivePhotosDetailsViews from '../../Views/LivePhotosDetailsViews';
import ModalContentViews from '../../Views/ModalContentViews';
import ModalLeaveRequest from './ModalLeaveRequest';
import Modal from '../../Views/ModalCreator';

const ModalLivePhotosDetails = ({ brand, imageSet, site_configuration, content }) => {
  const [state, setstate] = useState({
    imageSet,
  });
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const [swiper, setSwiper] = useState({});
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const swiperParams = {
    slidesPerView: 'auto',
    speed: 400,
    observer: true,
    observeParents: true,
    navigation: true,
    centeredSlides: true,
    watchSlidesProgress: true,
    loop: true,
    loopedSlides: 0,
    initialSlide: 0,
    onRealIndexChange: (e) => {
      const { realIndex } = e;
      if (realIndex >= state.imageSet.length) return;
      setActiveSlideIndex(realIndex);
    },
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    preloadImages: false,
    autoHeight: true,
  };
  const handleClickNotFound = (activeSlideIndex, imageSet) => {
    setModalStates({
      show: true,
      content: (
        <ModalLeaveRequest
          imageItem={imageSet[activeSlideIndex]}
          itemType={imageSet[activeSlideIndex].type ? 'video' : 'image'}
          onCancel={handleCancel}
          openModalFinalyLeaveRequest={openModalFinalyLeaveRequest}
        />
      ),
      addClass: 'modal-leave-request',
    });
  };
  const handleClickGalleryCard = (i) => {
    swiper.slideToLoop(i, 400);
  };
  const handleCancel = () => {
    setModalStates({ content: null, show: false });
  };
  const handleClickFindInCatalog = () => {
    window.location.href = site_configuration.page_type_catalog;
  };
  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
    });
  };

  const openModalFinalyLeaveRequest = (data) => {
    return setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.SuccessOrError
                closeModal={closeModal}
                success={data}
                content={data ? 'Заявка отправлена' : 'Заявка не отправилась'}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-success_error',
    });
  };
  return (
    <LivePhotosDetailsViews.ModalLivePhoto>
      <Modal.ModalCreator {...modalStates} setModalStates={setModalStates} />
      <Modal.StorControllerModal />
      <LivePhotosDetailsViews.ModalLivePhotoSwiper
        imageSet={state.imageSet}
        swiperParams={swiperParams}
        setSwiper={setSwiper}
      />
      <LivePhotosDetailsViews.ModalLivePhotoBrand
        brand={brand}
        imageSet={state.imageSet}
        desc={<div dangerouslySetInnerHTML={{ __html: content }}></div>}
        onClickNotFound={handleClickNotFound}
        onClickGalleryCard={handleClickGalleryCard}
        onClickFindInCatalog={handleClickFindInCatalog}
        activeSlideIndex={activeSlideIndex}
      />
    </LivePhotosDetailsViews.ModalLivePhoto>
  );
};

export default React.memo(ModalLivePhotosDetails);
