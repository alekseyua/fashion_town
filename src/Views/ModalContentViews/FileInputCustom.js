import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import style from './styles/index.module.scss';

const FileInputCustom = ({ label, setFieldValue, errors }) => {
  const fileInputRef = React.useRef();
  
  return (
    <React.Fragment>
      <div className={style['input-file']}>
        <label className={style['input-file-label']} htmlFor={'file'}>
          {label}
        </label>
        <GxButton
          variant="text"
          size="sm"
          onClick={(e) => {
            if (e.target.childNodes.length) {
              fileInputRef.current.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            className={style['input-file-input']}
            id="file"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(event) => {
              const files = event.currentTarget.files;
              setFieldValue('receipt', files[0]);
            }}
          />
        </GxButton>
      </div>
    </React.Fragment>
  );
};

export default React.memo(FileInputCustom);
