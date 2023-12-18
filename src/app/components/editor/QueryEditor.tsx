import { faMagicWandSparkles, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <div className={styles.editorQueryContainer}>
          <Editor
            height="500px"
            language="graphql"
            value={queryContent}
            onMount={handleEditorDidMount}
            options={{
              minimap: {
                enabled: false,
              },
              scrollBeyondLastLine: false,
              renderLineHighlight: 'none',
            }}
          />
          <button
            className={cn(styles.btnEditor, styles.btnRunQuery)}
            onClick={runQuery}
            title="Run Query"
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button
            className={cn(styles.btnEditor, styles.btnPrettify)}
            onClick={runQuery}
            title="Run Query"
          >
            <FontAwesomeIcon icon={faMagicWandSparkles} />
          </button>
        </div>
      </div>
    </>
  );
};

export default QueryEditor;
