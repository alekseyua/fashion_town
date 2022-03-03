import React from 'react';
import style from '../index.module.scss';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import ImageUpload from '../../../components/ImageUpload';

const SettingBlock = ({
  title,
  value,
  button = false,
  defaultImageMarketInfo = '',
  newPhoto = '',
  setFieldValue,
  handleClick,
}) => {
  const fileInputRef = React.useRef();
  return (
    <div className={style['cabinet_myshop__section_settings_block']}>
      {button ? (
        <ImageUpload>
          {({
            preview,
            onSelectFile,
            onSelectFiles,
            selectedFile,
            isDragActive,
            getRootProps,
            serializeFileList,
          }) => {
            return (
              <React.Fragment>
                <GxButton
                  className={style['cabinet_myshop__section_settings_block-image_upload']}
                  variant="text"
                  size="sm"
                  circle
                  onClick={(e) => {
                    if (fileInputRef) {
                      fileInputRef.current.click();
                    }
                  }}
                >
                  <input
                    ref={fileInputRef}
                    className={'hidden'}
                    id="image"
                    type="file"
                    accept=".png, .jpg, .jpeg, .mp4"
                    name={'logo'}
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      onSelectFile(file);
                      setFieldValue('logo', file);
                    }}
                  />
                  <div className={style['cabinet_myshop__section_settings_logo']}>
                    <img
                      src={preview ? preview : defaultImageMarketInfo}
                      alt="Shop logo"
                      className={style['cabinet_myshop__section_settings_img']}
                    />
                    <div className={style['cabinet_myshop__section_settings_logo_upload']}>
                      <GxIcon
                        src={newPhoto}
                        className={style['cabinet_myshop__section_settings_logo_icon']}
                      />
                    </div>
                  </div>
                </GxButton>
              </React.Fragment>
            );
          }}
        </ImageUpload>
      ) : null}

      <div className={style['cabinet_myshop__section_settings_wrap']}>
        <div className={style['cabinet_myshop__section_settings_head']}>{title}</div>

        {!button ? (
          <div className={style['cabinet_myshop__section_settings_text']}>{value}</div>
        ) : (
          <GxButton
            variant="text"
            size="sm"
            onClick={handleClick}
            className={style['cabinet_myshop__section_settings_btn']}
          >
            {value}
          </GxButton>
        )}
      </div>
    </div>
  );
};

export default React.memo(SettingBlock);
