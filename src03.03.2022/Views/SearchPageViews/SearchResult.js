import { GxIcon } from '@garpix/garpix-web-components-react';
import { Link } from 'react-router-dom';
import ProductPrice from '../../components/ProductPrice';
import { sliderArrowLeft } from '../../images';
import style from './style.module.scss';

const SearchResult = ({ item }) => {
  const { title, images, prices, url } = item;
  return (
    <Link to={url} className={style['search-result']}>
      <div className={style['search-result__info']}>
        <h4 className={style['search-result__title']}>{title}</h4>
        <ProductPrice price={prices.price} />
      </div>
      <div className={style['search-result__images']}>
        <img className={style['search-result__preview']} src={images[0]} />
        <GxIcon src={sliderArrowLeft} className={style['search-result__arrow']} />
      </div>
    </Link>
  );
};
export default React.memo(SearchResult);
