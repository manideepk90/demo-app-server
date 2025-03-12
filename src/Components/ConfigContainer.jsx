import {useState} from 'react';
import '../styles/ConfigContainer.css';
import ConfigItem from './Config/ConfigItem.jsx';
import JSONEditor from './JSONEditor.jsx';
export default function ConfigContainer({
  heading,
  shouldDisplay: shouldDisplayAs = false,
}) {
  const [shouldDisplay, setShouldDisplay] = useState(shouldDisplayAs);
  const [showEditor, setShowEditor] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [content, setContent] = useState({
    json: {
      greeting: 'Hello World',
      color: '#ff3e00',
      ok: true,
    },
  });
  return (
    <div className="config-container">
      <div className="heading">
        <h2 onClick={() => setShouldDisplay(prev => !prev)}>{heading}</h2>
        <button>Save</button>
      </div>
      <div className="config-content" aria-shouldDisplay={shouldDisplay}>
        <ConfigItem />
        <JSONEditor
          showEditor={showEditor}
          readOnly={readOnly}
          content={content}
        />
      </div>
    </div>
  );
}
