import React, { useState } from 'react';
import { GxIcon, GxModal } from '@garpix/garpix-web-components-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsDetailsViews from '../../Views/NewsDetailsViews';
import PreviewSlider from '../PreviewSlider';
import ModalContentViews from '../../Views/ModalContentViews';
import modalStyle from '../../Views/ModalCreator/modalCreator.module.scss';

const FancyButton = React.forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={className}>
    {props.children}
  </div>
));

const Slider = ({ imageOrVideoSet }) => {
  const [modalState, setmodalState] = useState({
    show: false,
    activeSlide: 1,
  });
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const closeModal = () => {
    setmodalState({
      ...modalState,
      show: false,
    });
  };
  const openModalAndSetActiveSlide = (id) => {
    setmodalState({
      ...modalState,
      activeSlide: id,
      show: true,
    });
  };

  const sliderParams = {
    slidesPerView: 3,
    speed: 300,
    observer: true,
    observeParents: true,
    pagination: false,
    navigation: true,
    resizeObserver: true,
    resistance: true,
    observer: true,
    observeSlideChildren: true,
    centerInsufficientSlides: true,
  };
  return (
    <NewsDetailsViews.Slider>
      <GxModal
        className={modalStyle['modal_creator']}
        onGx-after-hide={closeModal}
        open={modalState.show}
      >
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <div className="centerrel">
                <PreviewSlider imageOrVideoSet={imageOrVideoSet} />
              </div>
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      </GxModal>
      {imageOrVideoSet.length > 1 ? (
        <NewsDetailsViews.WrapperButton>
          <FancyButton className={'swiper-button-prev'} ref={navigationPrevRef}></FancyButton>
          <FancyButton className={'swiper-button-next'} ref={navigationNextRef}></FancyButton>
        </NewsDetailsViews.WrapperButton>
      ) : null}
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        //  {...imageOrVideoSet.length>1
        {...sliderParams}
        // :null}
      >
        {imageOrVideoSet.map((el, i) => {
          if (el.type === 'video') {
            return (
              <SwiperSlide key={i}>
                <NewsDetailsViews.Slide
                  openModal={openModalAndSetActiveSlide}
                  image={el.preview}
                ></NewsDetailsViews.Slide>
              </SwiperSlide>
            );
          } else {
            return (
              <SwiperSlide key={i}>
                <NewsDetailsViews.Slide
                  openModal={openModalAndSetActiveSlide}
                  image={el.image}
                ></NewsDetailsViews.Slide>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </NewsDetailsViews.Slider>
  );
};

export default React.memo(Slider);
