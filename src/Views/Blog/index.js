import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from '../../utils/dayjs';
import Text from '../../components/Text'

const Post = ({ image, title, slug, created_at }) => {
  return (
    <div className="single-blog">
      <div className="blog-img">
        <Link to={slug}><img src={image} alt="blog-image" /></Link>
      </div>
      <div className="blog-content">
        <h4 className="blog-title">
          <Link to={slug}>{title}</Link>
        </h4>
        <div className="blog-meta">
          <span>Дата публикации: </span> <Link to={slug}>{dayjs(created_at).format('DD.MM.YYYY')}</Link>
        </div>
        <div className="readmore">
          <Link to={slug}><Text text={'read_more'}/>.....</Link>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Post);