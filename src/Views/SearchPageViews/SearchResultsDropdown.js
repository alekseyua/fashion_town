import { GxDropdown, GxMenu, GxMenuItem } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Text from '../../components/Text';
import SearchResult from './SearchResult';
import style from './style.module.scss';
import qs from 'query-string';
import { useStoreon } from 'storeon/react';

const SearchResultsDropdown = ({
  results = [],
  open,
  // site_configuration,
  search: search_,
}) => {
  const { userPage } = useStoreon('userPage')
  const role = userPage.profile;
  const site_configuration = userPage.site_configuration;
  const output = qs.stringify({ q: search_ });

  if (!!search_ || output) {
    return (
      <GxDropdown className={style['search-dropdown']} open={open}>
        <GxMenu className={style['search-dropdown__menu']}>
          {results.map((item, index) => {
  console.log('outresultsput', item);

            return (
              <GxMenuItem className={style['search-dropdown__menu-item']} key={index}>
                <SearchResult item={item} />
              </GxMenuItem>
            );
          })}
          {results.length > 0 ? (
            <GxMenuItem
              className={classNames({
                [style['search-dropdown__menu-item']]: true,
                [style['search-dropdown__show-all']]: true,
              })}
            >
              <Link
                to={{ pathname: site_configuration?.page_type_search, search: output, role: role }}
              >
                <Text text={'show_all'}></Text>
              </Link>
            </GxMenuItem>
          ) : (
            <>
            {site_configuration?.page_type_search?
             <Link to={`${site_configuration?.page_type_search}${output}` }>
               <GxMenuItem className={style['search-dropdown__menu-item']}>
                 Ничего не найдено
               </GxMenuItem>
             </Link>
             :null}
            </>
          )}
        </GxMenu>
      </GxDropdown>
    );
  } else {
    return null;
  }
};

export default React.memo(SearchResultsDropdown);
