import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './styles/index.module.scss';
import { useHistory, useParams } from 'react-router-dom';

const BreadCrumbs = ({ breadcrumbs = [] }) => {
  //  const history = useHistory();
  //  const slagon = useParams();
  //  console.log('breadcrumbs',slagon);
  // const history = useHistory();
  // const goPage = () => {
  //   console.log('breadcrumbs',history);
  //   history.go
  // }
  // onClick={goPage}
  return (
    <div className={style['wrapper']}>
      {breadcrumbs.map((el, i) => {
        return (
          <React.Fragment key={i}>
            <Link className={style['wrapper__link']} to={el.slug=="" ? "/ru" : el.slug}>
              {el.title}
            </Link>
            {breadcrumbs.length - 1 !== i ? (
              <span className={style['wrapper__arrow']}>{'>'}</span>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default React.memo(BreadCrumbs);
