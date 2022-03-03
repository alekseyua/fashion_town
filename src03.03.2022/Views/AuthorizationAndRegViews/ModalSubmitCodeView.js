import React, { useState } from 'react';
import Timer from '../../utils/timer';
import Button from '../Button';
import ModalRestorePasswordDesc from './ModalRestorePasswordDesc';
import style from './styles/restorePassword.module.scss';

const ModalSubmitCodeView = ({ getNewSubmitCode }) => {
  const [timerDone, setTimerDone] = useState(false);
  const handleTimerDone = () => {
    setTimerDone(true);
  };
  const handleClickGetNewSubmitCode = () => {
    setTimerDone(false);
  };
  return (
    <div className={style['restore-password__submit-code']}>
      {timerDone ? (
        <>
          <ModalRestorePasswordDesc mb={'15px'}>
            Если вы не получили код, попробуйте еще раз
          </ModalRestorePasswordDesc>
          <Button variant={'looksLikeLink'} onClick={handleClickGetNewSubmitCode}>
            Попробовать снова
          </Button>
        </>
      ) : (
        <ModalRestorePasswordDesc mb={'15px'}>
          Получить код повторно можно через:
          <Timer timeInSeconds={5} onTimerDone={handleTimerDone} />
        </ModalRestorePasswordDesc>
      )}
    </div>
  );
};

export default React.memo(ModalSubmitCodeView);
