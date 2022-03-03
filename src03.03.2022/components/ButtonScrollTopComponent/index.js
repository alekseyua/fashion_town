import ButtonScroll from '../../Views/ButtonScroll';
import React, { useState, useEffect } from 'react';

const ButtonScrollTopComponent = ({}) => {
  const [isShowed, setIsShowed] = useState(false);
  const snowing = (e) => {
    if (e.currentTarget.pageYOffset > 100) {
      return setIsShowed(true);
    } else {
      return setIsShowed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', snowing);
    return () => {
      window.removeEventListener('scroll', snowing);
    };
  }, []);
  return isShowed ? <ButtonScroll /> : null;
};
export default React.memo(ButtonScrollTopComponent);
