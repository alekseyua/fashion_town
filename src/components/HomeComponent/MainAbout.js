import React from 'react';
import MainAboutLayout from '../../Views/MainAboutLayout';

const MainAbout = ({ about_banner }) => {
  return <MainAboutLayout about_banner={about_banner} />;
};
export default React.memo(MainAbout);
