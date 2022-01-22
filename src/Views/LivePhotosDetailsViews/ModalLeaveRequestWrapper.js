import style from './styles/index.module.scss';

const ModalLeaveRequestWrapper = ({ children }) => {
  return (
    <div className={style['leave-request-wrapper']}>
      <h3 className={style['leave-request__title']}>
        Не нашли в каталоге? Оставьте заявку и мы сообщим о появлении товара.
      </h3>
      {children}
    </div>
  );
};
export default React.memo(ModalLeaveRequestWrapper);
