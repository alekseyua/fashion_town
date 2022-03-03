import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { btnDownNoFill } from '../../images';
import CheckBox from '../CheckBox';
import CartViews from '../CartViews';
import Text from '../../components/Text';
import { getSelectedPhotoId } from '../../utils/serializers';
import style from './styles/index.module.scss';

const SelectedAndDownload = ({
  selectedAllHandler,
  selected_all,
  downloadSelectedPhoto,
  results,
  reload,
}) => {
  const data = getSelectedPhotoId(results);
  return (
    <div className={style['export__select_top']}>
      <CheckBox
        checked={selected_all}
        onGx-change={(e) => {
          selectedAllHandler(e.target.checked, reload);
          return false;
        }}
        label="Выделить все"
      />
      <div className={style['export__select_btn']}>
        <CartViews.LinkToFirmalization
          type={'btn'}
          enabled={data.length}
          onClick={(e) => {
            e.preventDefault();
            downloadSelectedPhoto(data);
          }}
        >
          <GxIcon src={btnDownNoFill} className={style['export__select_btn_icon']} />
          <Text text="download.selected" />
        </CartViews.LinkToFirmalization>
      </div>
    </div>
  );
};

export default React.memo(SelectedAndDownload);
