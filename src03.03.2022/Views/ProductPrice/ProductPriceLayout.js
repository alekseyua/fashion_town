import style from './productPrice.module.scss';

const ProductPriceLayout = ({ price, oldPrice = null, currenssies }) => {
  return (
    <p className={style['product-price']}>
      <span className={style['product-price__price']}>
        {price} {currenssies}
      </span>
      {oldPrice ? (
        <del className={style['product-price__prev-price']}>
          {oldPrice} {currenssies}
        </del>
      ) : null}
    </p>
  );
};
export default React.memo(ProductPriceLayout);
