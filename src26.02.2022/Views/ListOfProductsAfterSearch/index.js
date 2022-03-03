import InfoOfSearch from './InfoOfSearch';
import HeaderOfSearch from './HeaderOfSearch';
import style from './styles/index.module.scss';

const Container = ({ children }) => {
  return <div className={style['catalog-container']}>{children}</div>;
};

export default {
  InfoOfSearch,
  HeaderOfSearch,
  Container,
};
