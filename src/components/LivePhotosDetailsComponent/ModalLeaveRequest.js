import { GxForm } from '@garpix/garpix-web-components-react';
import { LeaveRequestsScheme } from '../../utils/schemesFormic';
import { Formik } from 'formik';
import LivePhotosDetailsViews from '../../Views/LivePhotosDetailsViews';
import api from '../../api';

const apiContent = api.contentApi;

const ModalLeaveRequest = ({ onCancel, openModalFinalyLeaveRequest, imageItem, itemType }) => {
  const handleSubmit = (data) => {
    if (!data.isAgreeDataProcessing) return; // openModalFinalyLeaveRequest(false);
    const fd = new FormData();
    fd.set('name', data.email);
    fd.set('message', data.comment);
    if (itemType === 'video') {
      fd.set('media_photo', imageItem.id);
    } else {
      fd.set('media_video', imageItem.id);
    }
    apiContent
      .postLivePhotoFeedback(fd)
      .then((res) => {
        const { status } = res;
        openModalFinalyLeaveRequest(status);
      })
      .catch((err) => {
        openModalFinalyLeaveRequest(false);
      });
  };

  return (
    <Formik
      validationSchema={LeaveRequestsScheme}
      initialValues={{
        email: null,
        comment: null,
        files: null,
        isAgreeDataProcessing: false,
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {

        console.log(`errors`, errors);
        return (
          <GxForm noValidate onGx-submit={handleSubmit}>
            <LivePhotosDetailsViews.ModalLeaveRequestWrapper>
              <LivePhotosDetailsViews.ModalLeaveRequestForm
                setFieldValue={setFieldValue}
                onCancel={onCancel}
                values={values}
              />
            </LivePhotosDetailsViews.ModalLeaveRequestWrapper>
          </GxForm>
        );
      }}
    </Formik>
  );
};

export default React.memo(ModalLeaveRequest);
