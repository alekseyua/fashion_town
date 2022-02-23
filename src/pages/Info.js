import React from 'react';
import Layout from '../Views';
import ContainerFull from '../Views/ContainerFull';
import dayjs from '../utils/dayjs';
import Modal from '../Views/ModalCreator';


const InfoPage = (props) => {
  const { content, title, created_at } = props.page_info;
  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <ContainerFull>
        <div className="blog-details">
          <div className="blog-content">
            <h1>{title}</h1>
            <div className="blog-meta">
              <span>On: </span> <Link to="#">{dayjs(created_at).format('DD.MM.YYYY')}</Link>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </ContainerFull>
    </Layout>
  );
};

export default React.memo(InfoPage);
