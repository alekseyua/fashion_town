import React, { useRef } from 'react';
import { GxButton, GxIcon, GxTextarea } from '@garpix/garpix-web-components-react';
import { marketLogo } from '../../../images';
import ImageUpload from '../../../components/ImageUpload';
import Error from '../../Error';
import JoditField from '../../JoditField'
import style from '../index.module.scss';

const HomeFormData = ({
  main_banner_1,
  main_banner_2,
  main_banner_3,
  main_first_background,
  main_first_text,
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
  if (!main_first_background) {
    main_first_background = marketLogo;
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
          const srcImage = preview ? preview : main_first_background;
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
                <span className={style['cabinet_myshop__tab_logo_text']}>Фон на превом экране</span>
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
                      setFieldValue('main_first_background', files[0]);
                    }}
                  />
                  Загрузить
                </GxButton>
              </div>
            </div>
          );
        }}
      </ImageUpload>
      {errors.main_first_background ? (
        <>
          {errors.main_first_background.map((el) => {
            return <Error message={el} />;
          })}
        </>
      ) : null}
      <div className={style['cabinet_myshop__tab_box']}>
        <JoditField
          label="Текст на первом экране"
          placeholder="Введите текст"
          value={main_first_text}
          name={'main_first_text'}
          onBlurhandler={(newContent) => {
            setFieldValue('main_first_text', newContent);
          }}
        />
        {/* <GxTextarea
          label="Текст на первом экране"
          name={'main_first_text'}
          placeholder="Введите текст"
          value={main_first_text}
          onGx-change={handleChange}
          className={style['cabinet_myshop__tab_textarea']}
        /> */}
        {errors.main_first_text ? <Error message={errors.main_first_text} /> : null}
        <div className={style['cabinet_myshop__tab_upload_wrapper']}>Фото для баннеров</div>
        <div className={style['cabinet_myshop__tab_upload_wrapper']}>
          {main_banner_1 ? (
            <>
              <div>
                <p>На данный момент: {getAboutPhoto(main_banner_1)}</p>
              </div>
            </>
          ) : null}
          <br />
          <input
            className={style['cabinet_myshop__tab_upload_wrapper-block']}
            onChange={(e) => {
              const files = e.currentTarget.files;
              setFieldValue('main_banner_1', files[0]);
            }}
            name={'main_banner_1'}
            type={'file'}
          />
        </div>
        {errors.main_banner_1 ? (
          <>
            {errors.main_banner_1.map((el) => {
              return <Error message={el} />;
            })}
          </>
        ) : null}

        <div className={style['cabinet_myshop__tab_upload_wrapper']}>
          {main_banner_2 ? (
            <>
              <div>
                <p>На данный момент: {getAboutPhoto(main_banner_2)}</p>
              </div>
            </>
          ) : null}
          <br />
          <input
            className={style['cabinet_myshop__tab_upload_wrapper-block']}
            onChange={(e) => {
              const files = e.currentTarget.files;
              setFieldValue('main_banner_2', files[0]);
            }}
            name={'main_banner_2'}
            type={'file'}
          />
        </div>
        {errors.main_banner_2 ? (
          <>
            {errors.main_banner_2.map((el) => {
              return <Error message={el} />;
            })}
          </>
        ) : null}

        <div className={style['cabinet_myshop__tab_upload_wrapper']}>
          {main_banner_3 ? (
            <>
              <div>
                <p>На данный момент: {getAboutPhoto(main_banner_3)}</p>
              </div>
            </>
          ) : null}
          <br />
          <input
            className={style['cabinet_myshop__tab_upload_wrapper-block']}
            onChange={(e) => {
              const files = e.currentTarget.files;
              setFieldValue('main_banner_3', files[0]);
            }}
            name={'main_banner_3'}
            type={'file'}
          />
        </div>
        {errors.main_banner_3 ? (
          <>
            {errors.main_banner_3.map((el) => {
              return <Error message={el} />;
            })}
          </>
        ) : null}
      </div>
    </div>
  );
};
export default React.memo(HomeFormData);
