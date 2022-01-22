import React from 'react';
import Layout from '../Views';
import ContainerFull from '../Views/ContainerFull';
import dayjs from '../utils/dayjs';

const InfoPage = (props) => {
  const { content, title, created_at } = props.page_info;
  return (
    <Layout {...props}>
      <ContainerFull>
        <div className="blog-details">
          <div className="blog-content">
            <h1>{title}</h1>
            <div className="blog-meta">
              <span>On: </span> <a href="#">{dayjs(created_at).format('DD.MM.YYYY')}</a>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </ContainerFull>
    </Layout>
  );
};

export default React.memo(InfoPage);
