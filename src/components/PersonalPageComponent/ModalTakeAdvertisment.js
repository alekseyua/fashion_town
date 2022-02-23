import PersonalPageViews from '../../Views/PersonalPageViews';
import Text from '../../components/Text';
import Button from '../../Views/Button';
import HelpText from '../../Views/HelpText';


const ModalTakeAdvertisment = ({ closeModal }) => {
  return (
    <PersonalPageViews.ModalProfileViews
      title={'Вы отписались от рассылки'}
      closeModal={closeModal}
    >
      <HelpText addClass={'profile-modal-advertisement'}>
        Вы отказались получать рассылки и теперь Вам не будут прихоодить уведомления
      </HelpText>
      <Button onClick={closeModal} type={'submit'} variant={'black_btn_full_width_with_margin'}>
        <Text text={'i.understand'} />
      </Button>
    </PersonalPageViews.ModalProfileViews>
  );
};
export default React.memo(ModalTakeAdvertisment);
