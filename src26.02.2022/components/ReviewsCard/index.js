import React, { useState, useEffect } from 'react';
import ReviewsCardView from '../../Views/ReviewsCardView';
import { GxModal } from '@garpix/garpix-web-components-react';
import { Player, BigPlayButton } from 'video-react';
import ModalContentViews from '../../Views/ModalContentViews';
import api from '../../api';
import modalStyle from '../../Views/ModalCreator/modalCreator.module.scss';

const apiContent = api.contentApi;

const reviewsParamsDefault = {
  content: 'content',
  created_at: 'created_at',
  id: 'id',
  likes_count: 'likes_count',
  isLiked: 'isLiked',
  product: 'product',
  product_url: null,
  review_photos: [],
  review_videos: [],
  stars: 5,
  updated_at: 'updated_at',
  user: 'user',
  user_rating: 'user_rating',
  setModalStates: 'setModalStates',
  setLike: 'setLike',
};

const ReviewsCard = ({
  blockEnableView = false,
  disabledLinkToProduct = false,
  content = reviewsParamsDefault.content,
  created_at = reviewsParamsDefault.created_at,
  current_user_like_id,
  is_current_user_liked,
  id = reviewsParamsDefault.id,
  likes_count = reviewsParamsDefault.likes_count,
  product,
  product_url,
  review_photos,
  review_videos,
  stars,
  updated_at,
  user,
  user_rating,
  profileId,
  setModalStates: propsSetModalStates,
  homePage,
}) => {
  const [modalStates, setModalStates] = useState({
    content: null,
    isShow: false,
  });
  const [isLiked, setisLiked] = useState(is_current_user_liked);
  const [like_id, setLike_id] = useState(current_user_like_id);
  const [likes_countState, setLikes_count] = useState(Number(likes_count));
  const closeModal = () => {
    setModalStates({
      isShow: false,
      content: null,
    });
  };
  const setLike = (id) => {
    if (isLiked) {
      apiContent
        .putLikes(like_id, { profile: profileId, review: id, is_active: false })
        .then((res) => {
          setLikes_count(likes_countState - 1);
          setisLiked(false);
        });
    } else {
      apiContent
        .postLikes({
          profile: profileId,
          review: id,
          is_active: true,
        })
        .then((res) => {
          setLikes_count(likes_countState + 1);
          setLike_id(res.data.id);
          setisLiked(true);
        });
    }
  };
  const openModalVideo = (slideData = false) => {
    if (slideData) {

      if (homePage) {
        return propsSetModalStates({
          content: (
            <ModalContentViews.ModalWrapper>
              <ModalContentViews.CloseBtn closeModal={closeModal} />
              <ModalContentViews.ContentBlock>
                <ModalContentViews.CenterPosition>
                  <ModalContentViews.ViewsVideo
                    preview={slideData.video_preview}
                    video={slideData.video}
                  />
                </ModalContentViews.CenterPosition>
              </ModalContentViews.ContentBlock>
            </ModalContentViews.ModalWrapper>
          ),
          isShow: true,
        });
      }
      setModalStates({
        content: (
          <ModalContentViews.ModalWrapper>
            <ModalContentViews.CloseBtn closeModal={closeModal} />
            <ModalContentViews.ContentBlock>
              <ModalContentViews.CenterPosition>
                <ModalContentViews.ViewsVideo
                  preview={slideData.video_preview}
                  video={slideData.video}
                />
              </ModalContentViews.CenterPosition>
            </ModalContentViews.ContentBlock>
          </ModalContentViews.ModalWrapper>
        ),
        isShow: true,
      });
    }
  };
  const openModalImage = (slideData = false) => {
    if (slideData) {
      if (homePage) {
        return propsSetModalStates({
          content: (
            <ModalContentViews.ModalWrapper>
              <ModalContentViews.CloseBtn closeModal={closeModal} />
              <ModalContentViews.ContentBlock>
                <ModalContentViews.CenterPosition>
                  <ModalContentViews.ViewsImage image={slideData.image} />
                </ModalContentViews.CenterPosition>
              </ModalContentViews.ContentBlock>
            </ModalContentViews.ModalWrapper>
          ),
          isShow: true,
        });
      }
      setModalStates({
        content: (
          <ModalContentViews.ModalWrapper>
            <ModalContentViews.CloseBtn closeModal={closeModal} />
            <ModalContentViews.ContentBlock>
              <ModalContentViews.CenterPosition>
                <ModalContentViews.ViewsImage image={slideData.image} />
              </ModalContentViews.CenterPosition>
            </ModalContentViews.ContentBlock>
          </ModalContentViews.ModalWrapper>
        ),
        isShow: true,
      });
    }
  };

  useEffect(() => {
    setisLiked(is_current_user_liked);
  }, [is_current_user_liked]);
  return (
    <React.Fragment>
      <GxModal
        className={modalStyle['modal_creator']}
        onGx-after-hide={closeModal}
        open={modalStates.isShow}
      >
        {modalStates.content}
      </GxModal>
      <ReviewsCardView
        disabledLinkToProduct={disabledLinkToProduct}
        blockEnableView={blockEnableView}
        content={content}
        created_at={created_at}
        id={id}
        likes_count={likes_countState}
        isLiked={isLiked}
        product={product}
        product_url={product_url}
        review_photos={review_photos}
        review_videos={review_videos}
        updated_at={updated_at}
        user={user}
        stars={stars}
        user_rating={user_rating}
        setLike={setLike}
        openModalVideo={openModalVideo}
        openModalImage={openModalImage}
      />
    </React.Fragment>
  );
};

export default React.memo(ReviewsCard);
