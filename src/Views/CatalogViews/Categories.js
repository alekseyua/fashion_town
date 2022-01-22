import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const Categories = ({ categories, setOpenCategory, setOpenSubCategory, isOpenCategory }) => {

  return (
    <nav className={style['catalog-menu']}>
      {categories.map((elCategory) => {
        if (elCategory?.children?.length) {
          return (
            <div
              key={elCategory.id}
              className={classNames({
                [style['catalog-menu__item']]: true,
                [style['catalog-menu__parent']]: true,
                [style['active']]: isOpenCategory.activeCategory === elCategory.id,
              })}
            >
              <div
                onClick={() => setOpenCategory(elCategory.id)}
                data-cy={`catalogCategory-${elCategory.id}`}
                className={classNames({
                  [style['catalog-menu__link']]: true,
                  [style['active']]: isOpenCategory.activeCategory === elCategory.id,
                })}
              >
                {elCategory.title}
              </div>
              {isOpenCategory.activeCategory === elCategory.id
                ? elCategory.children.map((elSubCategory) => {
                    return (
                      <div key={elSubCategory.id} className={style['catalog-menu__sub']}>
                        <div
                          onClick={() => setOpenSubCategory(elSubCategory.id)}
                          data-cy={`catalogSubCategory-${elSubCategory.id}`}
                          className={classNames({
                            [style['catalog-menu__link']]: true,
                            [style['active']]:
                              isOpenCategory.activeSubCategory === elSubCategory.id,
                          })}
                        >
                          {elSubCategory.title}
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          );
        } else {
          return (
            <div
              key={elCategory.id}
              onClick={() => setOpenCategory(elCategory.id)}
              className={classNames({
                [style['catalog-menu__item']]: true,
                [style['active']]: isOpenCategory.activeCategory === elCategory.id,
              })}
            >
              <div
                data-cy={`catalogCategory-${elCategory.id}`}
                className={classNames({
                  [style['catalog-menu__link']]: true,
                  [style['active']]: isOpenCategory.activeCategory === elCategory.id,
                })}
              >
                {elCategory.title}
              </div>
            </div>
          );
        }
      })}
    </nav>
  );
};

export default React.memo(Categories);
