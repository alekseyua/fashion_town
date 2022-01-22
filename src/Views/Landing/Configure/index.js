import Advice from './Advice';
import style from '../styles/index.module.scss';

const WrapWithContent = ({ title, children }) => {
  return (
    <section className={style['landing_sett']}>
      <h2 className={style['landing_sett__head']}>{title}</h2>
      <div className={style['landing_sett__wrapper']}>{children}</div>
    </section>
  );
};

export default {
  Advice,
  WrapWithContent,
};
