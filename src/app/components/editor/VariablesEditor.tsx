import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { cn } from '@/utils/cn';
import styles from './editor.module.scss';
import { Editor, OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { setEditorsHeights } from '@/redux/controlSlice';
import { changeVariablesContent } from '@/redux/editorSlice';

function VariablesEditor() {
  const editorRef = useRef<undefined | editor.IStandaloneCodeEditor>();
  const { variablesContent } = useAppSelector(
    (state: RootState) => state.editor
  );
  const { tab, editorsHeights } = useAppSelector(
    (state: RootState) => state.control
  );
  const dispatch = useAppDispatch();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorOnChange = (value: string | undefined) => {
    dispatch(changeVariablesContent(value || ''));
  };

  return (
    <div
      className={cn(
        styles.editorQueryContainer,
        styles.editorTabContent,
        tab === 'variables' ? styles.editorTabContentActive : ''
      )}
    >
      <div
        className={cn(
          'border-gray-800 border-2 rounded-2xl',
          styles.innerContainer
        )}
        onClick={() => {
          dispatch(setEditorsHeights([285, 250]));
        }}
      >
        <Editor
          height={`${editorsHeights[1]}px`}
          width="100%"
          language="json"
          value={variablesContent}
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
    </div>
  );
}

export default VariablesEditor;
