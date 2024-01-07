import { Editor, OnMount } from '@monaco-editor/react';
import { cn } from '@/utils/cn';
import styles from './editor.module.scss';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setEditorsHeights } from '@/redux/controlSlice';
import { useRef } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { changeQueryContent } from '@/redux/editorSlice';

function QueryEditor() {
  const { queryContent } = useAppSelector((state: RootState) => state.editor);
  const { editorsHeights } = useAppSelector(
    (state: RootState) => state.control
  );
  const dispatch = useAppDispatch();
  const editorRef = useRef<undefined | editor.IStandaloneCodeEditor>();

  const handleEditorOnChange = (value: string | undefined) => {
    dispatch(changeQueryContent(value || ''));
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <div
      className={cn('p-6', styles.innerContainer)}
      onClick={() => {
        dispatch(setEditorsHeights([390, 145]));
      }}
    >
      <Editor
        height={`${editorsHeights[0]}px`}
        width="100%"
        language="graphql"
        value={queryContent}
        onMount={handleEditorDidMount}
        onChange={handleEditorOnChange}
        options={{
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
          renderLineHighlight: 'none',
        }}
      />
    </div>
  );
}

export default QueryEditor;
