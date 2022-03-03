import classNames from 'classnames';
import Button from '../Button';
import { shoppingBag } from '../../images';
import style from './styles/index.module.scss';

const ModalLivePhotoBrand = ({
  brand,
  desc,
  imageSet,
  onClickNotFound,
  onClickGalleryCard,
  onClickFindInCatalog,
  activeSlideIndex,
}) => {
  return (
    <div className={style['live-photo-brand']}>
      <h1 className={style['live-photo-brand__title']}>{brand}</h1>
      <p className={style['live-photo-brand__desc']}>{desc}</p>
      <div className={style['live-photo-brand__btns']}>
        <Button
          variant={'black_btn_full_width'}
          iconLeft={shoppingBag}
          onClick={onClickFindInCatalog}
        >
          Найти в каталоге
        </Button>
        <Button
          variant={'notFoundBtn'}
          onClick={(e) => {
            onClickNotFound(activeSlideIndex, imageSet);
          }}
        >
          Не нашли в каталоге?
        </Button>
      </div>
      <div className={style['live-photo-gallery']}>
        {imageSet.map((el, i) => (
          <div
            className={style['live-photo-gallery__slide']}
            key={i}
            onClick={() => onClickGalleryCard(i)}
          >
            <img
              className={classNames({
                [style['live-photo-gallery__img']]: true,
                [style['live-photo-gallery__img--active']]: activeSlideIndex === i,
              })}
              src={el.image_thumb ? el.image_thumb : el.video_preview}
              key={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ModalLivePhotoBrand);
