import classNames from 'classnames';
import style from './style.module.scss';

const ShowResultFor = ({ children}) => {
  return (
    <div
      className={classNames({
        [style['header-buttons__search-wrapper']]: true,
        [style['header-buttons__search-wrapper--fade-in']]: openSearchInput,
      })}
      onClick={onClickSearchRoot}
    >
      {children}
    </div>
  );
};
export default React.memo(ShowResultFor);
