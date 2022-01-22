import React from 'react';
import { ROLE } from '../../const';
import classNames from 'classnames';
import Text from '../../components/Text';
import Title from '../Title';
import style from './styles/formSignIn.module.scss';

const HelpText = ({ role }) => {
  if (ROLE.DROPSHIPPER === role) {
    return <Text text={'checkLinksYourSocialNetworks'} />;
  } else if (ROLE.WHOLESALE === role) {
    return <Text text={'companyData'} />;
  } else {
    return null;
  }
};

const FormSingnUp = ({ children, role, step }) => {
  const wrapperCustomClassName = classNames({
    [style['wrapper']]: true,
    [style['mt_50']]: !!step,
  });
  return (
    <div className={wrapperCustomClassName}>
      <Title variant={'poppins'}>
        <Text text={'register'} />
      </Title>
      <div className={style['wrapper__title__help-text']}>
        {step !== 0 ? (
          <div className={style['wrapper__title__help__text-line']}>
            {step === 3 ? <HelpText role={role} /> : null}
          </div>
        ) : (
          <Text text={'previewRegistrationText'} />
        )}
      </div>
      {children}
    </div>
  );
};

export default React.memo(FormSingnUp);
