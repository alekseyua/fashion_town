import React from 'react';
import Layout from '../Views';
import Button from '../Views/Button';

const Error404 = (props) => {

  return (
    <Layout {...props}>
      <div className="errorpage">
        <div className="errorpage__title">404</div>
        <div className="errorpage__heading">Not Found</div>
        <div className="errorpage__text">
          Сожалеем, но страница не найдена :( <br />
          Попробуйте обновить страницу или вернитесь на главную.
        </div>
        <div className="errorpage__btns">
          <Button href={'/'} variant={'black_btn'}>
            на главную
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(Error404);
