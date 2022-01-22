import React, { useRef } from 'react';
import { v4 } from 'uuid';
// import JoditEditor from 'jodit-react';
import AsyncComponent from '../../components/AsyncComponent'
// import dynamic from "next/dynamic";
// import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

// const SunEditor = dynamic(() => import("suneditor-react"), {
//   ssr: false,
// });

// import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const AsyncJoditEditor = AsyncComponent(() => {
  return import('jodit-react');
});

const JoditField = ({ label, onBlurhandler, name, value, ...props }) => {
  const uuid = v4();
  const editor = useRef(null);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };
  return (
    <div>
      <label htmlFor={uuid}>{label}</label>
      <AsyncJoditEditor
        {...props}
        id={uuid}
        placeholder="Введите текст"
        value={value}
        config={config}
        name={name}
        tabIndex={1} // tabIndex of textarea
        ref={editor}
        onBlur={onBlurhandler}
      /> 
    </div>
  );
};

export default React.memo(JoditField);
