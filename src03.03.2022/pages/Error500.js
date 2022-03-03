import React from 'react';
import Layout from '../Views';
import Button from '../Views/Button';
import Text from '../components/Text';

const Error500 = (props) => {
  return (
    <Layout {...props}>
      <div className="errorpage">
        <div className="errorpage__title">500</div>
        <div className="errorpage__heading">Internal Server Error</div>
        <div className="errorpage__text">
          Сожалеем, но что-то пошло не так :( <br />
          Попробуйте обновить страницу или вернитесь на главную.
        </div>
        <div className="errorpage__btns">
          <Button href={'/ru'} variant={'black_btn'}>
            на главную
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(Error500);
