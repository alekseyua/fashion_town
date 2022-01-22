import React from 'react';
import CheckBox from '../CheckBox';
import Text from '../../components/Text';
import style from './styles/index.module.scss';
import { ROLE } from '../../const';
import Offset from '../Offset';

const CheckBoxFilters = ({ values, handleChangeFilters, fp_const, role }) => {

  return (
    <React.Fragment>
      <div className={style['catfilter-block']}>
        <div className={style['catfilter-block__content']}>
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={values.is_in_stock}
              onGx-change={(e) => handleChangeFilters(fp_const.is_in_stock, e)}
              variant="light"
              label={Text({ text: 'inStock' })}
              data-cy={`inStockCheckBox`}
            ></CheckBox>
          </div>
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={values.is_new}
              onGx-change={(e) => handleChangeFilters(fp_const.is_new, e)}
              variant="light"
              label={Text({ text: 'newItems' })}
              data-cy={`newItemsCheckBox`}
            ></CheckBox>
          </div>
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={values.is_bestseller}
              onGx-change={(e) => handleChangeFilters(fp_const.is_bestseller, e)}
              variant="light"
              label={Text({ text: 'hits' })}
              data-cy={`hitsCheckBox`}
            ></CheckBox>
          </div>
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={values.is_closeout}
              onGx-change={(e) => handleChangeFilters(fp_const.is_closeout, e)}
              variant="light"
              label={Text({ text: 'sell.out' })}
              data-cy={`sellOutCheckBox`}
            ></CheckBox>
          </div>
          <Offset offset={'content'}/>
          <div className={style['catfilter-block__heading']}>Производитель</div>
          <div className={style['catfilter-item']}>
            <CheckBox
              checked={!values.is_import}
              onGx-change={(e) => {
                e.target.checked = !e.target.checked
                handleChangeFilters(fp_const.is_import, e)
              }}
              variant="light"
              label={"Импорт"}
              data-cy={`sellOutCheckBox`}
            ></CheckBox>
            </div>
             <CheckBox
              checked={!values.is_polish}
              onGx-change={(e) => {
                e.target.checked = !e.target.checked
                handleChangeFilters(fp_const.is_polish, e)
              }}
              variant="light"
              label={"Польша"}
              data-cy={`sellOutCheckBox`}
            ></CheckBox>
        </div>
      </div>
      <div className={style['catfilter-block']}>
        <div className={style['catfilter-block__content']}>
          {role.number !== ROLE.RETAIL ? (
            <React.Fragment>
              {role.number !== ROLE.WHOLESALE ? (
                <div className={style['catfilter-item']}>
                  <CheckBox
                    checked={values.is_in_collection}
                    onGx-change={(e) => handleChangeFilters(fp_const.is_in_collection, e)}
                    variant="switch"
                    label={Text({ text: 'assembled' })}
                    data-cy={`assembledCheckBox`}
                  ></CheckBox>
                </div>
              ) : null}

              <div className={style['catfilter-item']}>
                <CheckBox
                  checked={values.is_not_range}
                  onGx-change={(e) => handleChangeFilters(fp_const.is_not_range, e)}
                  variant="switch"
                  label={Text({ text: 'not.in.rows' })}
                  data-cy={`notInRowsCheckBox`}
                ></CheckBox>
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(CheckBoxFilters);
