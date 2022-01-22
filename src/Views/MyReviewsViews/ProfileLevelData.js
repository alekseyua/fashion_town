import React from 'react';
import classNames from 'classnames';
import Text from '../../components/Text';
import Button from '../Button';
import AddReview from '../../components/AddReview';
import ModalContentViews from '../ModalContentViews';
import style from './styles/index.module.scss';

const ProfileLevelData = ({
  level = '«Королева шоппинга»',
  name = 'Наталья Тюмченкова',
  progress = '900',
  setModalStates,
  profile,
}) => {
  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
    });
  };
  const openModalFinalyAddReview = (data) => {
    return setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.SuccessOrError
                closeModal={closeModal}
                success={data}
                content={data ? 'Ваш отзыв успешно отправлен!' : 'Неправильно введены данные!'}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-success_error',
    });
  };
  const openModalAddReview = (data) => {
    return setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <AddReview.ModalAddReview
                openModalFinalyAddReview={openModalFinalyAddReview}
                profile={profile}
                canselationCallback={closeModal}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-review',
    });
  };

  return (
    <section>
      <div className={style['cabinet-formblock']}>
        <div className={style['cabinet-formblock__top']}>
          <h2 className={style['cabinet-formblock__heading']}>Мой статус по бонусной программе</h2>
        </div>
        <div className={style['cabinet-formblock__content']}>
          <p className={style['cabinet_reviews__name']}>{name}</p>
          <p className={style['cabinet_reviews__level']}>
            Участник уровня <span className={style['cabinet_reviews__level-boldup']}>{level}</span>.
            Скидка для данного статуса составляет{' '}
            <span className={style['cabinet_reviews__level-boldup']}>4%</span>. <br /> Вам не
            хватает 100 балла (-ов), чтобы получить свой следующий уровень.
            <br /> Скидка станет доступна через 20 дней (какое-то время модерации отзывов).
          </p>
          <p className={style['cabinet_reviews__counter']}>900 балла (-ов)</p>
          <div className={style['cabinet_reviews__rating']}>
            <div
              className={classNames({
                [style['cabinet_reviews__rating_circle']]: true,
                [style['cabinet_reviews__rating_circle-fill']]: true,
              })}
            ></div>
            <progress
              className={style['cabinet_reviews__rating_progress']}
              max="1000"
              value={progress}
            ></progress>
            <div className={style['cabinet_reviews__rating_circle']}></div>
          </div>
        </div>
      </div>
      <div className={style['cabinet_reviews__btnwrap']}>
        <Button onClick={openModalAddReview} variant={'cabinet_default'}>
          <Text text="add.review" />
        </Button>
      </div>
    </section>
  );
};

export default React.memo(ProfileLevelData);
