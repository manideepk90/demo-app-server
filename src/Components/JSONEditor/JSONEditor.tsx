import {
  createJSONEditor,
  JSONEditorPropsOptional,
  JsonEditor,
} from 'vanilla-jsoneditor';
import {useEffect, useRef} from 'react';
import './VanillaJSONEditor.css';

export default function JSONEditor(props: JSONEditorPropsOptional) {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const refEditor = useRef<JsonEditor | null>(null);
  const refPrevProps = useRef<JSONEditorPropsOptional>(props);

  useEffect(() => {
    refEditor.current = createJSONEditor({
      target: refContainer.current as HTMLDivElement,
      props,
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        console.log('destroy editor');
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      const changedProps = filterUnchangedProps(props, refPrevProps.current);
      refEditor.current.updateProps(changedProps);
      refPrevProps.current = props;
    }
  }, [props]);

  return <div className="vanilla-jsoneditor-react" ref={refContainer}></div>;
}

function filterUnchangedProps(
  props: JSONEditorPropsOptional,
  prevProps: JSONEditorPropsOptional,
): JSONEditorPropsOptional {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key, value]) =>
        value !== prevProps[key as keyof JSONEditorPropsOptional],
    ),
  );
}
