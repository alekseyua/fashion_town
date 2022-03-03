import classNames from 'classnames';
import style from './style.module.scss';

const SearchWrapper = ({ children, openSearchInput, onClickSearchRoot, bgRef }) => {
  return (
    <div
      className={classNames({
        [style['header-buttons__search-wrapper']]: true,
        [style['header-buttons__search-wrapper--fade-in']]: openSearchInput,
      })}
      onClick={onClickSearchRoot}
    >
      <div
        ref={bgRef}
        className={classNames({
          [style['header-buttons__search-wrapper__bg']]: true,
          [style['header-buttons__search-wrapper__bg--active']]: openSearchInput,
        })}
      ></div>
      {children}
    </div>
  );
};
export default React.memo(SearchWrapper);
