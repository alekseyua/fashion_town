import React, { useEffect, useState } from 'react';
import MyOrderViews from '../../Views/MyOrderViews';
import { btnDown, btnLoad } from '../../images';
import { infoWhite, statusWait } from '../../images';
import { FetcherList, dataStates } from '@garpix/fetcher';
import Text from '../Text';
import Table from '../../Views/Table';
import Pagination from '../../Views/Pagination';
import { useStoreon } from 'storeon/react';
import api from '../../api';
import PersonalPageViews from '../../Views/PersonalPageViews';
import Button from '../../Views/Button';
import Title from '../../Views/Title';

const apiOrder = api.orderApi;

const HistoryPayments = ({}) => {
  const { currenssies }                         = useStoreon('currenssies'); //currenssies
  const [ dataUpdateCheck, setDataUpdateCheck ] =  useState(false);
  const { updateCurrenssies }                      = useStoreon('updateCurrenssies');

  const { stateUpdateBalance }                      = useStoreon('stateUpdateBalance');
  const fileInputRef = React.useRef(null);
  const addCheck = (e, dataFeth) => {

    dataFeth.updateElementByKey( 
      {
        ...dataFeth.obj,
        receipt: 'treatment',
      },
      dataFeth.obj.id,
      'id',
    );
    let dataRequest = new FormData();
    dataRequest.set('receipt', e.currentTarget.files[0]);
    dataRequest.set('order', dataFeth.obj.order);
    apiOrder
      .updateReceipt(dataFeth.obj.id, dataRequest)
      .then((res) => {
        dataFeth.updateElementByKey(
          {
            ...dataFeth.obj,
            receipt: res.data.receipt,
          },
          dataFeth.obj.id,
          'id',
        );
      })
      .catch((err) => {
        dataFeth.updateElementByKey(
          {
            ...dataFeth.obj,
            receipt: null,
          },
          dataFeth.obj.id,
          'id',
        );
      });
  };
  const tableHeaderData = [
    [
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'date'} />
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'beneficiary.account'} />
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'status'} />
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'comment'} />
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'amount'} />, {String(currenssies).toUpperCase()}
          </MyOrderViews.ThData>
        ),
      },
      {
        content: (
          <MyOrderViews.ThData>
            <Text text={'receipt'} />
          </MyOrderViews.ThData>
        ),
      },
    ],
  ];
  /**
   * соберет верстку для данных и отправит на пуш в масив с tr
   * @param {[]} data
   * @returns масив с собранными компонентами для таблицы
   */
  const createTdForTable = (data = [], currenssies, dataFeth) => {
    let results = [];

    data.forEach((el) => {
      let tr = [];
      //!Дата
      tr.push({
        attr: { 'data-label': 'Дата' },
        content: el.date,
      });
      //!Счёт получателя
      tr.push({
        attr: { 'data-label': 'Счёт получателя' },
        content: <div dangerouslySetInnerHTML={{ __html: el.requisites.requisites }}></div>,
      });
      //!Статус
      tr.push({
        attr: { 'data-label': 'Статус' },
        content: <PersonalPageViews.BalanceStatus status={el.status} />,
      });
      //!Комментарий
      tr.push({
        attr: { 'data-label': 'Комментарий' },
        content: el.comment,
      });
      //!Сумма
      tr.push({
        attr: { 'data-label': 'Сумма' },
        content: (
          <strong>
            {el.cost ? el.cost : 0} {currenssies}
          </strong>
        ),
      });
      //!Чек
      if (el.receipt === 'treatment') {
        tr.push({
          attr: { 'data-label': 'Чек' },
          content: (
            <Button variant={'linkBtn'} type={'link'} href={el.receipt} iconLeft={statusWait}>
              <Text text={'file.processing'} />
            </Button>
          ),
        });
      } else {
        tr.push({
          attr: { 'data-label': 'Чек' },
          content: el.receipt ? (
            <Button variant={'linkBtn'} type={'link'} href={el.receipt} iconLeft={btnDown}>
              <Text text={'download'} />
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                if (e.target.childNodes.length) {
                  fileInputRef.current.click();
                }
              }}
              variant={'linkBtn'}
              type={'file'}
              iconLeft={btnLoad}
            >
              <Text text={'attach'} />
              <input
                ref={fileInputRef}
                onChange={(e) => addCheck(e, { ...dataFeth, obj: el })}
                className={'hidden'}
                type={'file'}
              />
            </Button>
          ),
        });
      }

      results.push(tr);
    });
    return results;
  };
  const initialFilters = { page: 1, page_size: 10 };
  // *****************************************************   
      useEffect(()=>{
        setDataUpdateCheck(true)
      },[updateCurrenssies, stateUpdateBalance])
  // *****************************************************

      return (
        <FetcherList isScrollTop={false} initFilter={initialFilters} api={apiOrder.getPaymentsProfile} >
      {(data) => {
        const {
          count,
          results = [],
          activePage,
          loadData,
          showMore,
          status,
          filterParams = initialFilters,
          deleteElement,
          updateElement,
          deleteElementByKey,
          updateElementByKey,
          isNext,
          isPrev,
        } = data;
        // *****************************************************
        const executeUpdate = () => {
          setDataUpdateCheck(false);
          data.reload();
        }
        dataUpdateCheck?executeUpdate():null;
        // *****************************************************
        let newResults = createTdForTable(results, currenssies, {
          loadData: loadData,
          updateElementByKey: updateElementByKey,
          filterParams: filterParams,
        });
        

        return (
          <>

            <MyOrderViews.WrapperTable>
              <Title variant={'cabinet__heading'} type={'h3'}>
                <Text text={'history.payments'} />
              </Title>

              <Table
                statusLoad={status}
                classNameTable="cabinet-table"
                tableHeaderData={tableHeaderData}
                tableBodyData={newResults}
              />
              <Pagination activePage={activePage} count={count} params={filterParams} />
            </MyOrderViews.WrapperTable>
          </>
        );
      }}
    </FetcherList>
  );
};

export default React.memo(HistoryPayments);
