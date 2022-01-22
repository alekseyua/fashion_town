import React, { useRef } from 'react';
import { marketLogo } from '../../../images';
import { GxButton } from '@garpix/garpix-web-components-react';
import ImageUpload from '../../../components/ImageUpload';
import style from '../index.module.scss';

const LogoAndPolit = ({ footer_logo, errors, setFieldValue, footer_policy }) => {
  if (!footer_logo) {
    footer_logo = marketLogo;
  }
  const fileInputRef = useRef();
  const getAboutPhoto = (data) => {
    if (typeof data === 'string') {
      return data;
    }
    return URL.createObjectURL(data);
  };
  return (
    <div className={style['cabinet_myshop__tab_logo_block-margin']}>
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
          const srcImage = preview ? preview : footer_logo;
          return (
            <div className={style['cabinet_myshop__tab_logo_block']}>
              <div className={style['cabinet_myshop__tab_logo_wrap']}>
                <img
                  src={getAboutPhoto(srcImage)}
                  alt="Market logo"
                  width={'200px'}
                  height={'100px'}
                  className={style['cabinet_myshop__tab_logo_img']}
                />
              </div>
              <div className={style['cabinet_myshop__tab_logo_desc']}>
                <span className={style['cabinet_myshop__tab_logo_text']}>Логотип</span>
                <GxButton
                  variant="text"
                  size="sm"
                  className={style['cabinet_myshop__tab_logo_btn']}
                  onClick={(e) => {
                    if (preview) {
                      onSelectFile();
                      return;
                    }
                    if (e.target.childNodes.length) {
                      e.target.childNodes[0].click();
                    }
                  }}
                >
                  <input
                    ref={fileInputRef}
                    className={'hidden'}
                    id="image"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name={'image'}
                    onChange={(event) => {
                      const files = event.currentTarget.files;
                      onSelectFile(files[0]);
                      setFieldValue('footer_logo', files[0]);
                    }}
                  />
                  Загрузить
                </GxButton>
              </div>
            </div>
          );
        }}
      </ImageUpload>
      <div className={style['cabinet_myshop__tab_logo_desc']}>
        <div className={style['cabinet_myshop__tab_upload_wrapper-left']}>
          <div className={style['cabinet_myshop__tab_upload_wrapper-span']}>
            Политика конфиденциальности
          </div>
          <div className={style['cabinet_myshop__tab_upload_wrapper-left']}>
            {footer_policy ? (
              <>
                <div>
                  <p>На данный момент: {getAboutPhoto(footer_policy)}</p>
                </div>
              </>
            ) : null}
            <input
              onChange={(e) => {
                const files = e.currentTarget.files;
                setFieldValue('footer_policy', files[0]);
              }}
              type="file"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LogoAndPolit);
