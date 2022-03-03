import React from 'react';

const InputTypeFile = ({ onChange, values, label = null, ...props }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...props} onChange={onChange} values={values} type="file" accept=".jpg, .png, .mp4" />
    </div>
  );
};

export default React.memo(InputTypeFile);
