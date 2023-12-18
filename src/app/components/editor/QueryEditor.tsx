import { Editor, OnMount } from '@monaco-editor/react';
import { cn } from '@/utils/cn';
import styles from './editor.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRef } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';

const QueryEditor = () => {
  const { queryContent } = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();
  const editorRef = useRef<undefined | editor.IStandaloneCodeEditor>();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const runQuery = () => {
    console.log(editorRef.current?.getValue());
  };

  return (
    <>
      <div className={cn(styles.editorLeftCol)}>
        <Editor
          height="600px"
          language="graphql"
          value={queryContent}
          onMount={handleEditorDidMount}
          options={{
            minimap: {
              enabled: false,
            },
            renderLineHighlight: 'none',
          }}
        />
      </div>
      <button onClick={runQuery}>Run Query</button>
    </>
  );
};

export default QueryEditor;
