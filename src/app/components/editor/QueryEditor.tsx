import {
  faMagicWandSparkles,
  faPlay,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Editor, OnMount } from '@monaco-editor/react';
import { cn } from '@/utils/cn';
import styles from './editor.module.scss';
import { RootState } from '@/redux/store';
import { useEffect, useRef, useState } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { prettifyGraphQLQuery } from '@/utils/prettier';
import { changeQueryContent } from '@/redux/editorSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { createGraphqlApi } from '@/api/graphql';
import EditorTabs from './EditorTabs';
import { hideDocs, showDocs } from '@/redux/commonSlice';
import { setEditorsHeights } from '@/redux/controlSlice';
import HeadersEditor from './HeadersEditor';
import VariablesEditor from './VariablesEditor';

const QueryEditor = () => {
  const { queryContent, variablesContent } = useAppSelector(
    (state: RootState) => state.editor
  );
  const { tab, editorsHeights } = useAppSelector(
    (state: RootState) => state.control
  );
  const dispatch = useAppDispatch();
  const editorRef = useRef<undefined | editor.IStandaloneCodeEditor>();
  const graphqlApi = createGraphqlApi('https://rickandmortyapi.com/graphql');
  const { useFetchSchemaQuery } = graphqlApi;
  const { data, isLoading, isError } = useFetchSchemaQuery({});
  const show = useAppSelector((state) => state.common.isShowDocs);

  useEffect(() => {
    if (data) {
      console.log(data, 'schema');
    }
  }, [data]);

  const handleEditorOnChange = (value: string | undefined) => {
    console.log(value);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const runQuery = () => {
    // TODO: Implement query
    console.log(editorRef.current?.getValue());
  };

  const runDoc = () => {
    dispatch(show ? hideDocs() : showDocs());
  };

  const runPrettier = () => {
    const updateQuery = prettifyGraphQLQuery(editorRef.current?.getValue());
    if (updateQuery) {
      dispatch(changeQueryContent(updateQuery));
      editorRef.current?.setValue(updateQuery);
    }
  };

  //add keyboard shortcut for prettier
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.ctrlKey && event.key === 'P') {
        event.preventDefault();
        runPrettier();
      }
      if (event.shiftKey && event.ctrlKey && event.key === 'D') {
        event.preventDefault();
        runQuery();
      }
      if (event.shiftKey && event.ctrlKey && event.key === 'R') {
        event.preventDefault();
        runDoc();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  return (
    <>
      <div className={cn(styles.editorQueryContainer, 'mb-2')}>
        <button
          className={cn(styles.btnEditor, styles.btnRunQuery)}
          onClick={runQuery}
          title="Run Query - Shift+Ctrl+R"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          className={cn(styles.btnEditor, styles.btnPrettify)}
          onClick={runPrettier}
          title="Prettify query - Shift+Ctrl+P"
        >
          <FontAwesomeIcon icon={faMagicWandSparkles} />
        </button>
        <button
          className={cn(styles.btnEditor, styles.btnDoc)}
          onClick={runDoc}
          title="Documentaion - Shift+Ctrl+D"
        >
          <FontAwesomeIcon icon={faBook} />
        </button>
        <div
          className={cn(
            'border-gray-800 border-2 rounded-2xl p-6',
            styles.innerContainer
          )}
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
      </div>
      <EditorTabs />
      <HeadersEditor />
      <VariablesEditor />
    </>
  );
};

export default QueryEditor;
