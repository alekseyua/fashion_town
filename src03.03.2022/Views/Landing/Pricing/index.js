import Info from './Info';
import CreateStore from '../../PersonalPageViews/CreateStore';
import style from '../styles/index.module.scss';

const WrapWithContent = ({ title, subTitle, children, image }) => {
  return (
    <section className={style['landing_pricing']}>
      <div className={style['landing__container']}>
        <div className={style['landing_pricing__wrapper']}>
          <div className={style['landing_pricing__left']}>
            <h2 className={style['landing_pricing__head']}>{title}</h2>
            <ul className={style['landing_pricing__list']}>{children}</ul>
            <div className={style['landing_pricing__list_line']}></div>
            <p className={style['landing_pricing__text']} dangerouslySetInnerHTML={{ __html: subTitle }}></p>
            <div className={style['landing__button-mb']}>
              <CreateStore />
            </div>
          </div>
          <img src={image} />
        </div>
      </div>
    </section>
  );
};

export default {
  Info,
  WrapWithContent,
};
