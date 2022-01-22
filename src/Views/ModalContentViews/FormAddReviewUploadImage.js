import React from 'react';
import ImageUpload from '../../components/ImageUpload';
import Text from '../../components/Text';
import Button from '../../Views/Button';
import style from './styles/index.module.scss';

const FormAddReviewUploadImage = ({ values, setFieldValue }) => {
  const fileInputRef = React.useRef(null);
  return (
    <div className={style['productreviews__form-upload']}>
      <p className={style['productreviews__form-upload-desc']}>
        <Text text={'photo.or.video'} />:
      </p>
      <ImageUpload>
        {({ preview, onSelectFile, selectedFile, onSelectFiles, isDragActive, getRootProps }) => {
          if (!Array.isArray(preview)) {
            preview = [preview];
          }
          return (
            <>
              <ul className={style['productreviews__form-upload-list']}>
                {preview.map((el, i) => {
                  return (
                    <li key={i} className={style['productreviews__form-upload-item']}>
                      <img
                        crossOrigin="anonymous"
                        className={style['productreviews__form-upload-image']}
                        src={el}
                      />
                    </li>
                  );
                })}
              </ul>
              <div {...getRootProps()} className={style['addprod-image']}>
                <div className={style['addprod-image__wrap']}>
                  <Button
                    className={style['productreviews__form-upload-button']}
                    onClick={(e) => {
                      if (e.target.childNodes.length) {
                        fileInputRef.current.click();
                      }
                    }}
                    variant={'linkBtn'}
                    type={'file'}
                  >
                    <Text text={'attach'} />
                    <input
                      multiple
                      ref={fileInputRef}
                      className={'hidden'}
                      id="image"
                      type="file"
                      accept=".png, .jpg, .jpeg, .mp4"
                      name={'image'}
                      onChange={(event) => {
                        const files = event.currentTarget.files;
                        setFieldValue('uploadFiles', files);
                        onSelectFiles(files);
                      }}
                    />
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </ImageUpload>
    </div>
  );
};

export default React.memo(FormAddReviewUploadImage);
