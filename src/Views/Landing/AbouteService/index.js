import AdvantagesOfService from './AdvantagesOfService';
import style from '../styles/index.module.scss';

const WrapWithContent = ({ title, subTitle, children }) => {
  return (
    <section className={style['landing_about']}>
      <h2 className={style['landing__head']}>{title}</h2>
      <p className={style['landing_about__text']} dangerouslySetInnerHTML={{ __html: subTitle }}></p>
      <div className={style['landing_about__card_wrapper']}>{children}</div>
    </section>
  );
};

export default {
  AdvantagesOfService,
  WrapWithContent,
};
