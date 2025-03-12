import {createJSONEditor} from 'vanilla-jsoneditor';
import {useEffect, useRef} from 'react';
import "./vanila-json-editor.css"
export default function JSONEditor(props) {
  const refContainer = useRef(null);
  const refEditor = useRef(null);
  const refPrevProps = useRef(props);
  
  useEffect(() => {
    refEditor.current = createJSONEditor({
      target: refContainer.current,
      props,
    });

    return () => {
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (refEditor.current) {
      const changedProps = filterUnchangedProps(props, refPrevProps.current);
      refEditor.current.updateProps(changedProps);
      refPrevProps.current = props;
    }
  }, [props]);

  return <div className="vanilla-jsoneditor-react" ref={refContainer}></div>;
}

function filterUnchangedProps(props, prevProps) {
  return Object.fromEntries(
    Object.entries(props).filter(([key, value]) => value !== prevProps[key]),
  );
}
