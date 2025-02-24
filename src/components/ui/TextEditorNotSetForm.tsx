/* eslint-disable react/prop-types */

import JoditEditor from 'jodit-react';
import { useMemo, useRef, useState } from 'react';
// import parse from "html-react-parser";
interface IProps {
  textEditorValue?: string;
  defaultTextEditorValue?: string;
  setTextEditorValue: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditorNotSetValue = ({
  setTextEditorValue,
  defaultTextEditorValue = '',
}: IProps) => {
  const editor = useRef(null);
  const [content, setContent] = useState(defaultTextEditorValue);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing...',
      // allowFileUpload: true,
      // sanitize: false,
      defaultMode: 1, // Set default alignment to left
      toolbarAdaptive: false,
    }),
    []
  );

  return (
    <>
      {
        <JoditEditor
          ref={editor}
          config={editorConfig}
          value={content}
          // tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setTextEditorValue(newContent);
            setContent(newContent);
          }} // preferred to use only this option to update the content for performance reasons
          // onChange={(newContent) =>  setTextEditorValue(newContent)}
        />
      }
      {/* <div>
        <div>{content && parse(content)}</div>
      </div> */}
    </>
  );
};

export default TextEditorNotSetValue;
