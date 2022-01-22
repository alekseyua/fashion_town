import React, { useState, useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import api from '../../api';
import MainPromotion from '../../Views/MainPromotion';
import TopHeader from '../../Views/TopHeader';
import BottomHeader from '../../Views/BottomHeader';
import classNames from 'classnames';

export default ({
  headerModClosed,
  header_menu = [],
  main_menu = [],
  announce,
  cabinet_data,
  profile,
  cabinet_menu,
  site_configuration,
  currencies,
}) => {
  const { userPage } = useStoreon('userPage')
  const role = userPage.profile;
  const { page_type_search } = site_configuration;
  const { promotionsAdds } = useStoreon('promotionsAdds');
  //const [totalPrice, setTotal] = useState(0);
  //console.log('totalPrice', totalPrice);
  //const { cart } = useStoreon('cart');
  const [offsetTop, setOffsetTop] = useState(124);
  const [isScrolled, setScrolled] = useState(false);
  const [isActiveSubmenuBg, setActiveSubmenuBg] = useState(false);
  const [searchState, setSearchState] = useState({
    search: '',
    results: [],
    openDropDown: false,
  });

  const handleChangeSearchValue = (e) => {
    const value = e.target.value;
    setSearchState((prevState) => ({
      ...prevState,
      search: value,
      openDropDown: value === '' ? false : true,
    }));
    api
      .getSearch({ q: value, role: role })
      .then((res) => {
        setSearchState((prevState) => ({
          ...prevState,
          results: res,
        }));
      })
      .catch((error) => {
        console.log("error", {error});
      });
  };
  const handleClickSearchBtn = () => {
    // window.location.href = page_type_search;
  };
  const handleClickSearchRoot = () => {
    setSearchState((prevState) => ({
      ...prevState,
      search: '',
      openDropDown: false,
      results: [],
    }));
  };
  const onScroll = (offsetTop) => {
    let currentPosition = window.pageYOffset;
    if (currentPosition >= offsetTop) {
      // downscroll code
      if (!isScrolled) setScrolled(true);
    } else {
      // upscroll code
      setScrolled(false);
    }
  };

  const decSetOffsetTop = (offset) => {
    setOffsetTop(offset);
  };

  // useEffect(() => {
  
  //   const getPrice = async () => setTotal(await api.getTotalPrice(cart));
    
  //   getPrice();

  // }, [cart]);

  useEffect(() => {
    if (headerModClosed) {
      setScrolled(true);
      decSetOffsetTop(62);
    }
  }, []);
  return (
    <header>
      <MainPromotion announce={announce} role={role} />
      <div
        className={classNames({
          header: true,
          close__promoution: !promotionsAdds.isOpen,
          top: !promotionsAdds.isOpen,
          deactive: headerModClosed,
        })}
      >
        <TopHeader
          isActiveSubmenuBg={isActiveSubmenuBg}
          setActiveSubmenuBg={setActiveSubmenuBg}
          header_menu={header_menu}
          cabinet_data={cabinet_data}
          profile={profile}
          cabinet_menu={cabinet_menu}
          site_configuration={site_configuration}
          currencies={currencies}
        />
        <BottomHeader
          site_configuration={site_configuration}
          profile={profile}
          cabinet_menu={cabinet_menu}
          cabinet_data={cabinet_data}
          isScrolled={isScrolled}
          header_menu={header_menu}
          main_menu={main_menu}
          onChangeSearchInput={handleChangeSearchValue}
          onClickSearchBtn={handleClickSearchBtn}
          onClickSearchRoot={handleClickSearchRoot}
          searchResults={searchState.results}
          searchValue={searchState.search}
          openDropDown={searchState.openDropDown}
        />
      </div>
    </header>
  );
};
