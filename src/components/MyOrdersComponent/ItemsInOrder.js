import React, { useEffect, useState } from 'react';
import { GxIcon, GxTooltip, GxSpinner, GxButton, GxModal } from '@garpix/garpix-web-components-react';
import MyOrderViews from '../../Views/MyOrderViews';
import BaseInfoOrder from './BaseInfoOrder';
import AddReview from '../../components/AddReview';
import { infoWhite } from '../../images';
import { FetcherList, dataStates } from '@garpix/fetcher';
import Text from '../Text';
import Table from '../../Views/Table';
import Pagination from '../../Views/Pagination';
import { Link } from 'react-router-dom';
import ModalContentViews from '../../Views/ModalContentViews';
import { useStoreon } from 'storeon/react';
import api from '../../api';
import classNames from 'classnames';
import styleModal from '../../Views/ModalCreator/modalCreator.module.scss';
import GoBackToCartModalContent from '../GoBackToCartModalContent';
import { useHistory } from 'react-router';

const ItemsInOrder = ({ apiOrder, setModalStates, statuses, profile,page_type_catalog }) => {
  const [tableBodyData, setTableBodyData] = useState([]);
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const [ dataUpdateCheck, setDataUpdateCheck ] =  useState(false);
  const { updateCurrenssies, dispatch }                      = useStoreon('updateCurrenssies');
  const [ stateClickDel, setStateClickDel ] = useState(false);
  const history = useHistory();
  const [ modalStates, setmodalStates]                          = useState({
    show: false,
    content: null,
    cusstomClassNameModalResize: null,
  });

  const initialFilters = { page: 1, page_size: 10 };

const tableHeaderData = [
  [
    {
      content: <MyOrderViews.ThData>Дата</MyOrderViews.ThData>,
    },
    {
      content: <MyOrderViews.ThData>№ заказа</MyOrderViews.ThData>,
    },
    {
      content: <MyOrderViews.ThData>Получатель</MyOrderViews.ThData>,
    },
    {
      content: <MyOrderViews.ThData>Стоимость</MyOrderViews.ThData>,
    },
    {
      content: (
        <MyOrderViews.ThData>
          Статус
          {/* <GxTooltip content="This is a tooltip"> */}
            {/* <Link to="#" className="cabinet-table__thlink">
              <GxIcon src={infoWhite} alt="table__thlink" />
            </Link> */}
          {/* </GxTooltip> */}
        </MyOrderViews.ThData>
      ),
    },
    // {
      // content: el.status.status === 'in_process' ? <MyOrderViews.ThData>Добавить в заказ</MyOrderViews.ThData> : el.status.status === 'payment_waiting' ? <MyOrderViews.ThData>Отменить заказ</MyOrderViews.ThData> : null
    // },
    // {
    //   content: <MyOrderViews.ThData>Отменить заказ</MyOrderViews.ThData>,
    // },
  ],
];

const createName = ({ first_name, last_name, middle_name }) => {
  if (last_name && first_name) return `${last_name} ${String(first_name[0]).toUpperCase()}.`;
  return <Text text={'ivalid.name'} />;
};

/**
 * соберет верстку для данных и отправит на пуш в масив с tr
 * @param {[]} data
 * @returns масив с собранными компонентами для таблицы
 */
const createTdForTable = (data = [], currenssies) => {
  let results = [];
  data.forEach((el,i) => {
    // el.status.status === 'in_process'?
    // setStateActiveBtn([...stateActiveBtn,'disabled'])
    // :setStateActiveBtn([...stateActiveBtn,null])
    let tr = [];
    //!date
    tr.push({
      attr: { 'data-label': 'Дата' },
      content: el.created_at,
    });
    //!№ order
    tr.push({
      attr: { 'data-label': '№ заказа' },
      content: (
        <>
          {el.order_number.length ? (
            <Link to={el.order_number}>{el.order_number}</Link>
          ) : (
            'Товар не выбран'
          )}
        </>
      ),
    });
    //!full name
    tr.push({
      attr: { 'data-label': 'Получатель' },
      content: createName(el.address),
    });
    //!total count
    tr.push({
      attr: { 'data-label': 'Стоимость' },
      content: (
        <strong>
          {el.total ? el.total : 0} {currenssies}
        </strong>
      ),
    });
    //!status
    tr.push({
      attr: { 'data-label': 'Статус' },
      content: (
        <MyOrderViews.TdStatusData status={el.status.status} statusTitle={el.status.title} />
      ),
    });
    //Добавить в заказ
    // tr.push({
    //   attr: { 'data-label': 'Добавить' },
    //   content: (
    //     // <MyOrderViews.TdStatusData  />
    //     <GxButton 
    //       type="submit" 
    //       variant='default' 
    //       onClick={(e)=>btnAddOrderItems(el)}
    //       disabled={el.status.status !== 'in_process'?"disable":null}
    //     >
    //     Добавить
    //     </GxButton>
    //   ),
    // });
    //удалить заказ
    el.status.status === 'payment_waiting' || el.status.status === 'in_process' ?
    tr.push({
      attr: { 'data-label': el.status.status === 'payment_waiting' ? 'Отменить заказ' : 'Добавить' },
      content: (
        // <MyOrderViews.TdStatusData  />
        <GxButton 
          type="submit" 
          variant='default' 
          onClick={(e)=> {
            el.status.status === 'payment_waiting' ? btnDelOrder(el) : btnAddOrderItems(el)
          }}
          // disabled={el.status.status === 'payment_waiting' ? null : "disable"}
          // el.status.status === 'in_process' ||  || el.status.status === 'payment_in_stock' 
        >
          {/* ожидается оплата", товар оплачен или в сборе  in_process , payment_waiting */}
          {el.status.status === 'payment_waiting' ? 'Отменить' : 'Добавить'}
        </GxButton>
      ),
    })
    : null;
    results.push(tr);
  });
  return results;
};



// *****************************************************************************************

const btnAddOrderItems = async () => {
  //нужно ввести переменную со значением который говорит что должен быть выподающий список
 const result = await api.orderApi.listOrderItem()
                  // .then(res=>res)
                  // .then(()=>{return res})
                  // .catch(err=>err);
  history.push('catalog');
}

  // *****************************************************************************************

const btnDelOrder = (data) => {
    const params = {
     //order_id : data.order_number,
     order_id : data.id,    
    }
  //  const gotoCartFunc = (e, value) => { 
  //   value?deleteOrder(params):null;
  //  }
   api
   .orderApi
   .cancelOrder(params)
   .then(res=>{
    setStateClickDel(!stateClickDel)
     })
     .catch(err=>console.log('ERROR btnDelOrder dont work',err))
  
    // setmodalStates({ 
    //   content: <GoBackToCartModalContent 
    //               closeModal={closeModal} 
    //               // page_type_cart={page_type_cart} 
    //               gotoCartFunc={gotoCartFunc}
    //             />,
    //   show: true,
    //   cusstomClassNameModalResize: 'modal-payments',
    // });    
  }

  const deleteOrder = (params) => {
  // closeModal()
   // запрос работает нужно  только раскомить
    //  api
    //    .orderApi
    //    .cancelOrder(params)
    //    .then(res=>{
    //        console.log('Order was delete from orders');
    //      })
    //      .catch(err=>console.log('ERROR btnDelOrder dont work',err))
      
  }
 //------------------------------------------------------------------------------------------------


  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
    });
  };
  
  const hideReviewBlock = () => {
    tableBodyData.shift();
    setTableBodyData(tableBodyData);
  };

  const openModalFinalyAddReview = (data) => {
    return setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.SuccessOrError
                closeModal={closeModal}
                success={data}
                content={'Неправильно введены данные!'}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-success_error',
    });
  };

  const openModalAddReview = () => {
    setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <AddReview.ModalAddReview
                openModalFinalyAddReview={openModalFinalyAddReview}
                profile={profile}
                canselationCallback={closeModal}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-review',
    });
  };
  const setDefaultTableBlock = () => {
    setTableBodyData([
      [
        {
          content: (
            tableBodyData ?
             null
              :(
            <MyOrderViews.InfoReview
              page_type_catalog={page_type_catalog}
            />)
          ),
          attr: { colSpan: 5, className: 'cabinet-table__tdfull not_hovered' },
        },
      ],
    ]);
  };

  useEffect(() => {
    setDefaultTableBlock();
    /*  return setDefaultTableBlock(); */
  }, []);
  // *****************************************************   
  useEffect(()=>{
    setDataUpdateCheck(true)
  },[updateCurrenssies, stateClickDel])
// *****************************************************
  return (
    <FetcherList isScrollTop={true} initFilter={initialFilters} api={apiOrder.getOrders} >
      {(data) => {
        const {
          count,
          results = [],
          activePage,
          loadData,
          showMore,
          status,
          filterParams,
          deleteElement,
          updateElement,
          deleteElementByKey,
          updateElementByKey,
          isNext,
          isPrev,
        } = data;
//reload

// *****************************************************
        const executeUpdate = () => {
          setDataUpdateCheck(false);
          data?.reload();
        }
        dataUpdateCheck?executeUpdate():null;
        // *****************************************************

        let newResults = createTdForTable(results, currenssies);
        let tableData = [...tableBodyData, ...newResults];

        return (
          <>
            <GxModal
              onGx-after-hide={closeModal}
              open={modalStates.show}
              className={classNames({
                [styleModal['modal_creator']]: true,
                [styleModal[modalStates.cusstomClassNameModalResize]]:
                modalStates.cusstomClassNameModalResize,
              })}
              >
              <ModalContentViews.CloseBtn closeModal={closeModal} />
              {modalStates.content}
            </GxModal>

            <BaseInfoOrder
              statuses={statuses}
              activePage={activePage}
              loadData={loadData}
              filterParams={filterParams}
              count={count}
            />
            <MyOrderViews.WrapperTable>
              <Table
                statusLoad={status}
                classNameTable="cabinet-table"
                tableHeaderData={tableHeaderData}
                tableBodyData={tableData}
              />
              <Pagination activePage={activePage} count={count} params={filterParams} />
            </MyOrderViews.WrapperTable>
          </>
        );
      }}
    </FetcherList>
  );
};

export default React.memo(ItemsInOrder);
