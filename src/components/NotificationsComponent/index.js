import React, { useEffect, useState } from 'react';
import { FetcherList, dataStates } from '@garpix/fetcher';
import Pagination from '../../Views/Pagination';
import Title from '../../Views/Title';
import NotificationsViews from '../../Views/NotificationsViews';
import api from '../../api';

const apiProfile = api.profileApi;

const NotificationsComponent = ({ }) => {
  const initialFilters = {};
  const [checkEnable, setCheckEnable] = useState(false);
  const [allCheckEnableChange, setAllCheckEnableChange] = useState([]);

  // отправляем массив выделеных элементов для замены статуса
  const heandlerReed = () => {
    apiProfile
      .postNotificationsReed({
        'ids': allCheckEnableChange
      })
      .then((res) => {
        updateDataForm()
        //window.location?.reload()
      })
      .catch((err) => console.error(`err test reques ${err}`));
  }
  // отправляем массив выделеных элементов для удаления
  const heandlerDel = () => {
    apiProfile
      .postNotificationsDel({
        'ids': allCheckEnableChange
      })
      .then((res) => {
        updateDataForm()
        //window.location?.reload()
      })
      .catch((err) => console.error(`err test reques ${err}`));
  }

  let updateArrForm = () => { }
  let updateDataForm = () => { }
  // выделение всех элементов (сообщений)
  const checkAllBox = () => {
    setCheckEnable(!checkEnable)
    updateArrForm(setAllCheckEnableChange)
  }


  return (
    <>
      <Title variant={'cabinet__heading'} type={'h3'}>
        Уведомления
      </Title>
      <FetcherList
        isScrollTop={true}
        updateArrForm={updateArrForm}
        updateDataForm={updateDataForm}
        initFilter={initialFilters}
        api={apiProfile.getNotifications
        }
      >
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
            newData,
          } = data;

          // пробигаемся по масиву сообщений и создаём новый массив с id
          updateArrForm = (setAllCheckEnableChange) => {
            let checkAllId = []
            for (let i = 0; i < results.length; i++) {
              !checkEnable ? checkAllId.push(results[i].id) : null
            }
            setAllCheckEnableChange(checkAllId)
          }

          // обновляем форму с данными
          updateDataForm = () => {
            data?.reload()
          }


          return (
            <>
              <NotificationsViews.Wrapper>
                <NotificationsViews.SubText>
                  <div>
                    В данном разделе доступна история всех уведомлений и писем от нашей команды
                  </div>
                </NotificationsViews.SubText>
                <NotificationsViews.Header heandlerReed={heandlerReed} heandlerDel={heandlerDel} checkAllBox={checkAllBox} checkEnable={checkEnable} />
                {results.map((el) => {
                  return (
                    <NotificationsViews.Item
                      key={el.id}
                      setAllCheckEnableChange={setAllCheckEnableChange}
                      allCheckEnableChange={allCheckEnableChange}
                      isRead={el.is_read}
                      date={el.created_at}
                      message={el.message}
                      setCheckEnable={setCheckEnable}
                      checkEnable={checkEnable}
                      el={el}
                    />
                  );
                })}

              </NotificationsViews.Wrapper>
              <Pagination activePage={activePage} count={count} params={filterParams} />
            </>
          );
        }}
      </FetcherList>
    </>
  );
};

export default React.memo(NotificationsComponent);
