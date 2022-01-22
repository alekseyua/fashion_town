import React, { useEffect, useState } from 'react';
import OrderDetailsPersonalPageViews from '../../Views/OrderDetailsPersonalPageViews';
import { GxForm } from '@garpix/garpix-web-components-react';
import ModalContentViews from '../../Views/ModalContentViews';
import { Formik } from 'formik';
import api from '../../api';

const orderApi = api.orderApi;
const Chat = ({ order_id, setModalStates }) => {
  const [correspondenceState, setcorrespondenceState] = useState([]);
  const [valuesState, setvaluesState] = useState({
    text_field: '',
    file_list: [],
  });
  const getChatData = () => {
    orderApi
      .getCorrespondence({ order_id: order_id })
      .then((res) => {
        setcorrespondenceState(res);
      });
  };
  const sendCommentFromTextField = (values, { resetForm }) => {
    const fd = new FormData();
    fd.set('order', order_id);
    fd.set('message', values.text_field);
    fd.set('files', values.file_list);
    
    orderApi
      .postCorrespondence(fd)
      .then((res) => {
        getChatData();
        resetForm({
          text_field: '',
          file_list: [],
        });
    });
  };
  const handleChange = (key, value) => {
    setvaluesState({
      ...valuesState,
      [key]: value,
    });
  };
  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
      addClass: null,
    });
  };
  const openModalImage = (image) => {
    setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.ViewsImage image={image} />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-review',
    });
  };
  const openModalVideo = (video, preview) => {
    setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.ViewsVideo video={video} preview={preview} />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-review',
    });
  };

  useEffect(() => {
    getChatData();
  }, []);

  return (
    <Formik enableReinitialize onSubmit={sendCommentFromTextField} initialValues={valuesState}>
      {({ handleSubmit, values, handleChange, setFieldValue }) => {
        
        return (
          <GxForm noValidate onSubmit={handleSubmit}>
            <OrderDetailsPersonalPageViews.WrapperChat>
              <OrderDetailsPersonalPageViews.HeadChat />
              <OrderDetailsPersonalPageViews.ChatFieldsWrapper>
                {correspondenceState.map((el, i) => {
                  if (el.is_me) {
                    return (
                      <OrderDetailsPersonalPageViews.ChatFieldUser
                        openModalImage={openModalImage}
                        openModalVideo={openModalVideo}
                        key={i}
                        {...el}
                      />
                    );
                  } else {
                    return (
                      <OrderDetailsPersonalPageViews.ChatFieldAdmin
                        openModalImage={openModalImage}
                        openModalVideo={openModalVideo}
                        key={i}
                        {...el}
                      />
                    );
                  }
                })}
              </OrderDetailsPersonalPageViews.ChatFieldsWrapper>
              <OrderDetailsPersonalPageViews.SendChatBlock
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                handleSubmit={handleSubmit}
                sendCommentFromTextField={sendCommentFromTextField}
              />
            </OrderDetailsPersonalPageViews.WrapperChat>
          </GxForm>
        );
      }}
    </Formik>
  );
};

export default React.memo(Chat);
