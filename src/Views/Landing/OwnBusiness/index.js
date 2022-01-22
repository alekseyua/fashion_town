import PopularBrands from './PopularBrands';
import CreateStore from '../../PersonalPageViews/CreateStore';
import style from '../styles/index.module.scss';

const WrapWithContent = ({ title, subTitle, children, subHeaderOfLeader, image }) => {
  return (
    <section className={style['landing_offer']}>
      <div className={style['landing_offer__wrapper']}>
        <div className={style['landing_offer__left']}>
          <h1 className={style['landing_offer__head']}>{title}</h1>
          <p className={style['landing_offer__text']} dangerouslySetInnerHTML={{ __html: subTitle }}></p>
          <div className={style['landing__button-mb']}>
            <CreateStore />
          </div>
          <h2 className={style['landing_offer__brands']}>{subHeaderOfLeader}</h2>
          <div className={style['landing_offer__brands_wrapper']}>{children}</div>
        </div>
        <div className={style['landing_offer__right']}>
          <img className={style['landing_offer__img']} src={image} alt="Image" />
        </div>
      </div>
    </section>
  );
};

export default {
  PopularBrands,
  WrapWithContent,
};
