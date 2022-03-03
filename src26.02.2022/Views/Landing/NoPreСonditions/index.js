import CreateStore from '../../PersonalPageViews/CreateStore';
import style from '../styles/index.module.scss';

const WrapWithContent = ({ title, subTitle, image }) => {
  return (
    <section className={style['landing_motivation']}>
        <div className={style['landing_motivation__wrapper']}>
          <div className={style['landing_motivation__left']}>
            <h2 className={style['landing__head-left']}>{title}</h2>
            <p
              className={style['landing_motivation__text']}
              dangerouslySetInnerHTML={{ __html: subTitle }}
            ></p>
            <div className={style['landing__button']}>
              <CreateStore />
            </div>
          </div>
          <div className={style['landing_motivation__right']}>
            <img src={image} className={style['landing_motivation__img']} alt="Image" />
          </div>
        </div>
      </section>
  );
};

export default {
  WrapWithContent,
};
