import React from 'react';
import style from './styles/restorePassword.module.scss';

const ModalRestorePasswordDesc = ({ children, mb = '0px' }) => {
  return (
    <div className={style['restore-password__desc']} style={{ marginBottom: mb }}>
      {children}
    </div>
  );
};

export default React.memo(ModalRestorePasswordDesc);
