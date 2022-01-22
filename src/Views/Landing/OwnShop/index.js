import Step from './Step';
import TypeOfIcon from './TypeOfIcon';
import WrapForIcon from './WrapForIcon';
import WrapForStep from './WrapForStep';
import Container from './Container';
import style from '../styles/index.module.scss';

const WrapWithContent = ({ title, subTitle, children}) => {
  return (
    <section className={style['landing_create']}>
        <div className={style['landing__container']}>
          <h2 className={style['landing_create__head']}>{title}</h2>
          <p
            className={style['landing_create__text']}
            dangerouslySetInnerHTML={{ __html: subTitle }}
          ></p>
          {children}
        </div>
      </section>
  );
};

export default {
  Step,
  WrapWithContent,
  TypeOfIcon,
  WrapForIcon,
  WrapForStep,
  Container,
};
