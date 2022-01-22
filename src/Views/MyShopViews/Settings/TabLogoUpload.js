import React, { useRef } from 'react';
import { GxButton, GxIcon, GxTextarea } from '@garpix/garpix-web-components-react';
import { marketLogo } from '../../../images';
import ImageUpload from '../../../components/ImageUpload';
import JoditField from '../../JoditField';
import Offset from '../../Offset';
import Error from '../../Error';
import style from '../index.module.scss';

const TabLogoUpload = ({
  about_logo,
  about_full_description,
  about_short_description,
  about_photo,
  handleChange,
  setFieldValue,
  errors,
}) => {
  const fileInputRef = useRef();
  const getAboutPhoto = (data) => {
    if (data instanceof File) {
      return URL.createObjectURL(data);
    }
    return data;
  };
  if (!about_logo) {
    about_logo = marketLogo;
  }
  return (
    <div className={style['cabinet_myshop__tab_wrapper']}>
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
          const srcImage = preview ? preview : about_logo;
          return (
            <div className={style['cabinet_myshop__tab_logo_block']}>
              <div className={style['cabinet_myshop__tab_logo_wrap']}>
                <img
                  src={srcImage}
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
                      setFieldValue('about_logo', files[0]);
                    }}
                  />
                  Загрузить
                </GxButton>
              </div>
            </div>
          );
        }}
      </ImageUpload>
      {errors.about_logo ? (
        <>
          {errors.about_logo.map((el) => {
            return <Error message={el} />;
          })}
        </>
      ) : null}
      <div className={style['cabinet_myshop__tab_box']}>
        {/* <GxTextarea
          label="Краткий текст о компании"
          name={'about_short_description'}
          placeholder="Введите текст"
          value={about_short_description}
          onGx-change={handleChange}
          className={style['cabinet_myshop__tab_textarea']}
        /> */}
        <JoditField
          label="Краткий текст о компании"
          placeholder="Введите текст"
          value={about_short_description}
          name={'about_short_description'}
          onBlurhandler={(newContent) => {
            setFieldValue('about_short_description', newContent);
          }}
        />
        <Offset offset={'content'} />
        {errors.about_short_description ? <Error message={errors.about_short_description} /> : null}
        <div className={style['cabinet_myshop__tab_upload_wrapper']}>
          {about_photo ? (
            <>
              <div>
                <p>На данный момент: {getAboutPhoto(about_photo)}</p>
              </div>
            </>
          ) : null}
          <br />
          <input
            className={style['cabinet_myshop__tab_upload_wrapper-block']}
            onChange={(e) => {
              const files = e.currentTarget.files;
              setFieldValue('about_photo', files[0]);
            }}
            name={'about_photo'}
            type={'file'}
          />
        </div>
        {errors.about_photo ? (
          <>
            {errors.about_photo.map((el) => {
              return <Error message={el} />;
            })}
          </>
        ) : null}
      </div>
      <div className={style['cabinet_myshop__tab_box']}>
        {/* <GxTextarea
          label="Полный текст о компании"
          placeholder="Введите текст"
          name={'about_full_description'}
          value={about_full_description}
          onGx-change={handleChange}
          className={style['cabinet_myshop__tab_textarea']}
        /> */}
        <JoditField
          label="Полный текст о компании"
          placeholder="Введите текст"
          value={about_full_description}
          name={'about_full_description'}
          onBlurhandler={(newContent) => {
            setFieldValue('about_full_description', newContent);
          }}
        />
        <Offset offset={'content'} />
        {errors.about_full_description ? (
          <>
            {errors.about_full_description.map((el) => {
              return <Error message={el} />;
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};
export default React.memo(TabLogoUpload);
