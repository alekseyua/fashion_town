import React from 'react';

const Sharing = ({
  children,
  title = 'Bits and pieces: Web Share APприI article',
  text = 'Web Share API feature is awesome. You must check it',
}) => {
  const callbackShareClick = () => {
    // Проверка поддержки navigator.share
    if (navigator.share) {
      console.log('Congrats! Your browser supports Web Share API');
      navigator
        .share({
          title: title,
          text: text,
          url: window.location.href,
        })
        .then(function () {

        })
        .catch(function (e) {
          console.log('Sharing failed',e);
        });
    } else {
      console.log('Sorry! Your browser does not support Web Share API');
    }
  };

  return <>{children({ callbackShareClick })}</>;
};

export default Sharing;
