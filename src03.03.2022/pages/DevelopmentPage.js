import React from 'react';
import Layout from '../Views';
import Button from '../Views/Button';
import Text from '../components/Text';
import Modal from '../Views/ModalCreator';


const DevelopmentPage = (props) => {

  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <div className="errorpage">
        <div className="errorpage__title">Упс</div>
        <div className="errorpage__heading">Страница находится в разработке</div>
        <div className="errorpage__text">
          Скоро сделаем =) <br />
          Попробуйте обновить страницу или вернитесь на главную.
        </div>
        <div className="errorpage__btns">
          <Button variant={'black_btn'}>на главную</Button>
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(DevelopmentPage);
