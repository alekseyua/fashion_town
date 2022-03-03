import React, { useState, useEffect } from 'react';
import Table from '../Table';
import Text from '../../components/Text';
import classNames from 'classnames';
import { rotateMatrix } from '../../utils';
import style from '../InformationViews/styles/index.module.scss';
import styleTable from '../Table/styles/table.module.scss';
import Button from '../Button';

const WorldStandardSizesChart = ({ productTableVariant = false, site_configuration = {} }) => {
  const tableHeaderDataRu = [
    [
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Международный размер',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Российский размер',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Обхват груди, см ',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Обхват талии, см',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Обхват бёдер, см',
      },
    ],
  ];
  const tableBodyDataRu = [
    // xxs
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'xxs',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '38',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '74-76',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '58-61',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '81-84',
      },
    ],
    // xs
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'xs',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '40',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '77-81',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '62-65',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '85-88',
      },
    ],
    // s
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 's',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '42',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '82-85',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '66-69',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '89-92',
      },
    ],
    // m
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'm',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '44',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '86-89',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '70-73',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '93-96',
      },
    ],
    // l
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'l',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '46',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '90-93',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '74-77',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '97-100',
      },
    ],
    // xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'xl',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '48',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '94-97',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '78-81',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '101-104',
      },
    ],
    // xxl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'xxl',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '50',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '98-102',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '82-85',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '105-108',
      },
    ],
    // 3xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: '3xl',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '52',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '103-107',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '86-90',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '109-112',
      },
    ],
    // 4 xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: '4 xl',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '54',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '108-113',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '91-95',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '113-116',
      },
    ],
    // 5 xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: '5 xl',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '56',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '114-119',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '96-102',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '117-121',
      },
    ],
    // 6 xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: '6 xl',
      },
      {
        attr: { 'data-label': 'Российский размер' },
        content: '58',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '120-125',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '103-108',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '122-126',
      },
    ],
  ];
  const tableHeaderDataEu = [
    [
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Международный размер',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Европейский размер',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Германский размер',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Итальянский размер',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Французский размер',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Обхват груди, см ',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Обхват талии, см',
      },
      {
        attr: { className: productTableVariant && styleTable['small'] },
        content: 'Обхват бёдер, см',
      },
    ],
  ];
  const tableBodyDataEu = [
    // xxs
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'xxs',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '32',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '32',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '36',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '34',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '74-76',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '58-61',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '81-84',
      },
    ],
    // xs
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'xs',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '34',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '34',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '38',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '36',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '77-81',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '62-65',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '85-88',
      },
    ],
    // s
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 's',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '36',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '36',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '40',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '38',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '82-85',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '66-69',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '89-92',
      },
    ],
    // m
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'm',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '38',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '38',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '42',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '40',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '86-89',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '70-73',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '93-96',
      },
    ],
    // l
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'l',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '40',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '40',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '44',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '42',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '90-93',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '74-77',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '97-100',
      },
    ],
    // xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'xl',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '42',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '42',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '46',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '44',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '94-97',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '78-81',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '101-104',
      },
    ],
    // xxl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: 'xxl',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '44',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '44',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '48',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '46',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '98-102',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '82-85',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '105-108',
      },
    ],
    // 3xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: '3xl',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '46',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '46',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '50',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '48',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '103-107',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '86-90',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '109-112',
      },
    ],
    // 4 xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: '4 xl',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '48',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '48',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '52',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '50',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '108-113',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '91-95',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '113-116',
      },
    ],
    // 5 xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: '5 xl',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '50',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '50',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '54',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '52',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '114-119',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '96-102',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '117-121',
      },
    ],
    // 6 xl
    [
      {
        attr: { 'data-label': 'Международный размер' },
        content: '6 xl',
      },
      {
        attr: { 'data-label': 'Европейский размер' },
        content: '52',
      },
      {
        attr: { 'data-label': 'Германский размер' },
        content: '52',
      },
      {
        attr: { 'data-label': 'Итальянский размер' },
        content: '56',
      },
      {
        attr: { 'data-label': 'Французский размер' },
        content: '54',
      },
      {
        attr: { 'data-label': 'Обхват груди, см' },
        content: '120-125',
      },
      {
        attr: { 'data-label': 'Обхват талии, см' },
        content: '103-108',
      },
      {
        attr: { 'data-label': 'Обхват бёдер, см' },
        content: '122-126',
      },
    ],
  ];
  const [russiasStandart, setRussianStandart] = useState(false);
  const [state, setstate] = useState({
    tableBodyDataEu: tableBodyDataEu,
    tableBodyDataRu: tableBodyDataRu,
    tableHeaderDataRu: tableHeaderDataRu,
    tableHeaderDataEu: tableHeaderDataEu,
  });

  useEffect(() => {
    if (productTableVariant) {
      const tableBodyDataEuRotated = rotateMatrix(tableBodyDataEu);
      const tableBodyDataRuRotated = rotateMatrix(tableBodyDataRu);
      setstate({
        ...state,
        tableBodyDataEu: tableBodyDataEuRotated.map((el, i) => [tableHeaderDataEu[0][i], ...el]),
        tableBodyDataRu: tableBodyDataRuRotated.map((el, i) => [tableHeaderDataRu[0][i], ...el]),
      });
    }
  }, [productTableVariant]);

  return (
    <React.Fragment>
      <h3
        className={
          productTableVariant
            ? style['information-howto__heading-center']
            : style['information-howto__heading']
        }
      >
        <Text text={'world.standart.table.size'} />
      </h3>

      <div className={style['information-howto__switcher']}>
        <button
          className={classNames({
            [style['information-howto__switcher-heading']]: true,
            [style['active']]: russiasStandart,
          })}
          onClick={() => setRussianStandart(true)}
        >
          <Text text={productTableVariant ? 'ru.size' : 'russian.standart.size'} />
        </button>
        <button
          className={classNames({
            [style['information-howto__switcher-heading']]: true,
            [style['active']]: !russiasStandart,
          })}
          onClick={() => setRussianStandart(false)}
        >
          <Text text={productTableVariant ? 'er.size' : 'euro.standart.size'} />
        </button>
      </div>
      {russiasStandart ? (
        <Table
          classNameTable={
            productTableVariant ? 'information-howto-small-table' : 'information-howto-table'
          }
          tableBodyData={state.tableBodyDataRu}
          tableHeaderData={productTableVariant ? [] : state.tableHeaderDataRu}
        />
      ) : (
        <Table
          classNameTable={
            productTableVariant ? 'information-howto-small-table' : 'information-howto-table'
          }
          tableBodyData={state.tableBodyDataEu}
          tableHeaderData={productTableVariant ? [] : state.tableHeaderDataEu}
        />
      )}
      {productTableVariant ? (
        <div>
          <p>
            * Приведенные данные в таблице являются ориентиром для самостоятельного определения
            своего размера согласно мировым стандартам. Реальные размеры товаров, представленных на
            сайте, могут отличаться. Если вы затрудняетесь с определением своего размера, просьба
            обратиться в нашу техническую поддержку.
          </p>
          <Button href={'/information/how_to'} variant={'cancel-black-full'}>
            <Text text={'how.choose.size'} />
          </Button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default React.memo(WorldStandardSizesChart);
