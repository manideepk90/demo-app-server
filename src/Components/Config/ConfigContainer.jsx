import {useEffect, useState} from 'react';
import './../../styles/ConfigContainer.css';
import ConfigItem from './../Config/ConfigItem.jsx';
import JSONEditor from './../JSONEditor/JSONEditor.js';
export default function ConfigContainer({
  heading,
  shouldDisplay: shouldDisplayAs = false,
  options = [],
  initcontent = {},
  data = {},
  optionOnchange = () => {},
  handleSave = data => {},
}) {
  const [shouldDisplay, setShouldDisplay] = useState(shouldDisplayAs);
  const [showEditor, setShowEditor] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [content, setContent] = useState({
    json: initcontent,
  });

  return (
    <div className="config-container">
      <div className="heading">
        <h2 onClick={() => setShouldDisplay(prev => !prev)}>{heading}</h2>
        <button
          className="bt bt-secondary"
          onClick={() => {
            handleSave(content);
          }}>
          Save
        </button>
      </div>
      <div className="config-content" aria-shouldDisplay={shouldDisplay}>
        <ConfigItem
          options={options}
          selectedOption={data.selectedOption}
          handleOnChange={optionOnchange}
        />
        <JSONEditor
          showEditor={showEditor}
          readOnly={readOnly}
          content={content}
          onChange={updatedContent => {
            setContent(updatedContent);
          }}
        />
      </div>
    </div>
  );
}
