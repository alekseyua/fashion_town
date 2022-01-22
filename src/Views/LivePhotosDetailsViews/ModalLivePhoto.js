import style from './styles/index.module.scss';

const ModalLivePhoto = ({ children }) => {
  return <div className={style['live-photo__modal']}>{children}</div>;
};
export default React.memo(ModalLivePhoto);
