import React, { useEffect, useState } from 'react';
import api from '../../api';
import PersonalPageViews from '../../Views/PersonalPageViews';
import ModalAddAddress from './ModalAddAddress';
import Text from '../Text';
import modalStyle from '../../Views/ModalCreator/modalCreator.module.scss';
import { GxForm, GxIcon, GxModal } from '@garpix/garpix-web-components-react';
import Spinner from '../../Views/DefaultAuthText/Spinner';
import Input from '../../Views/Input';
import { searchIcon } from '../../images';
import Button from '../../Views/Button';

const apiOrder = api.orderApi;
const initialState = {
  addresses: [],
  isLoad: false,
};

const DeliveryAddresses = ({ profileId }) => {
  const [modalStates, setModalStates] = useState({ show: false, content: null, initialData: {} });
  const [typeModal, setTypeModal] = useState('');
  const [search, setSearch] = useState('');
  const [state, setState] = useState(initialState);

  const updateAddressRenderData = () => {
    setState({
      ...state,
      isLoad: true,
    });
    apiOrder
      .getOrderAddressDeliviry()
      .then((res) => {
        setState({
          ...state,
          addresses: res.results,
          isLoad: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isLoad: false,
        });
      });
  };
  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
      initialData: {},
    });
  };
  const changeAddress = (data) => {
    setTypeModal('change');
    setModalStates({
      show: true,
      initialData: data,
    });
  };
  const deleteAddress = (id) => {
    apiOrder
      .deleteByIdOrderAddressDeliviry(id)
      .then((res) => {
        updateAddressRenderData();
      })
      .catch((err) => {
       console.log('err', err);
      });
  };
  const createAddress = (data) => {
    setTypeModal('create');
    setModalStates({
      show: true,
      initialData: {},
    });
  };
  const searchAddressRenderData = (data) => {
    setSearch(data);
    setState({
      ...state,
      isLoad: true,
    });
    apiOrder
      .getOrderAddressSearch({ q: data })
      .then((res) => {
        setState({
          ...state,
          addresses: res,
          isLoad: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isLoad: false,
        });
      });
  };
  const handleChangeSearchInput = (data) => {
    searchAddressRenderData(data.target.value);
  };

  //!didMount
  useEffect(() => {
    updateAddressRenderData();
  }, []);

  return (
    <PersonalPageViews.WrapperForm>
      <GxModal
        className={modalStyle['modal_creator']}
        onGx-after-hide={closeModal}
        open={modalStates.show}
      >
        <ModalAddAddress
          updateAddressRenderData={updateAddressRenderData}
          typeModal={typeModal}
          profileId={profileId}
          closeModal={closeModal}
          initialData={modalStates.initialData}
        />
      </GxModal>
      <PersonalPageViews.HeaderFormDefaultTitle title={Text({ text: 'address.delivery' })} />
      <PersonalPageViews.FormBlockContent>
        <PersonalPageViews.FormGroup>
          <Input
            value={search}
            name={'searchAddress'}
            autocomplete={'off'}
            onGx-input={handleChangeSearchInput}
            clearable
            className={''}
            helpText={''}
            label={''}
            placeholder={'Поиск по адресу'}
            inputmode={'search'}
          >
            <GxIcon src={searchIcon} alt="search" slot={'prefix'}></GxIcon>
          </Input>
        </PersonalPageViews.FormGroup>

        <PersonalPageViews.AdresesWrapper>
          <PersonalPageViews.AddAdress onClick={createAddress} />
          {state.isLoad ? <Spinner /> : null}
          {state.addresses.map((el) => {
            return (
              <PersonalPageViews.Address
                {...el}
                id={el.id}
                key={el.id}
                address={`${el.post_code}, ${el.street}`}
                userFullName={`${el.first_name} ${el.last_name} ${el.middle_name}`}
                phone={el.phone}
                changeAddress={changeAddress}
                deleteAddress={deleteAddress}
              />
            );
          })}
        </PersonalPageViews.AdresesWrapper>
      </PersonalPageViews.FormBlockContent>
    </PersonalPageViews.WrapperForm>
  );
};

export default React.memo(DeliveryAddresses);
