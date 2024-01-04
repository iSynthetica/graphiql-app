import { faMagicWandSparkles, faPlay } from '@fortawesome/free-solid-svg-icons';
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

const QueryEditor = () => {
  const { queryContent, headersContent, variablesContent } = useAppSelector(
    (state: RootState) => state.editor
  );
  const { tab } = useAppSelector((state: RootState) => state.control);
  const [editorsHeights, setEditorsHeights] = useState<number[]>([390, 145]);
  const dispatch = useAppDispatch();
  const editorRef = useRef<undefined | editor.IStandaloneCodeEditor>();
  const editorVarsRef = useRef<undefined | editor.IStandaloneCodeEditor>();
  const editorHeadersRef = useRef<undefined | editor.IStandaloneCodeEditor>();
  const graphqlApi = createGraphqlApi('https://rickandmortyapi.com/graphql');
  const { useFetchSchemaQuery } = graphqlApi;
  const { data, isLoading, isError } = useFetchSchemaQuery({});

  useEffect(() => {
    if (data) {
      console.log(data, 'schema');
    }
  }, [data]);

  const handleEditorOnChange = (value: string | undefined) => {
    console.log(value);
  };

  const handleEditorHeadersOnChange = (value: string | undefined) => {
    console.log(value);
  };

  const handleEditorVarsOnChange = (value: string | undefined) => {
    console.log(value);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorHeadersDidMount: OnMount = (editor, monaco) => {
    editorVarsRef.current = editor;
  };

  const handleEditorVarsDidMount: OnMount = (editor, monaco) => {
    editorHeadersRef.current = editor;
  };

  const runQuery = () => {
    // TODO: Implement query
    console.log(editorRef.current?.getValue());
    console.log(editorVarsRef.current?.getValue());
    console.log(editorHeadersRef.current?.getValue());
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
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  return (
    <>
      <div className={cn(styles.editorQueryContainer, 'mb-2')}>
        <div
          className={cn(
            'border-gray-800 border-2 rounded-2xl p-6',
            styles.innerContainer
          )}
          onClick={() => {
            setEditorsHeights([390, 145]);
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
        <button
          className={cn(styles.btnEditor, styles.btnRunQuery)}
          onClick={runQuery}
          title="Run Query"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          className={cn(styles.btnEditor, styles.btnPrettify)}
          onClick={runPrettier}
          title="Prettify query"
        >
          <FontAwesomeIcon icon={faMagicWandSparkles} />
        </button>
      </div>
      <EditorTabs />
      <div
        className={cn(
          styles.editorQueryContainer,
          styles.editorTabContent,
          tab === 'headers' ? styles.editorTabContentActive : ''
        )}
      >
        <div
          className={cn(
            'border-gray-800 border-2 rounded-2xl',
            styles.innerContainer
          )}
          onClick={() => {
            setEditorsHeights([285, 250]);
          }}
        >
          <Editor
            height={`${editorsHeights[1]}px`}
            width="100%"
            language="json"
            value={headersContent}
            onMount={handleEditorHeadersDidMount}
            onChange={handleEditorHeadersOnChange}
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
      <div
        className={cn(
          styles.editorQueryContainer,
          styles.editorTabContent,
          tab === 'variables' ? styles.editorTabContentActive : ''
        )}
      >
        <div
          className={cn(
            'border-gray-800 border-2 rounded-2xl p-6',
            styles.innerContainer
          )}
          onClick={() => {
            setEditorsHeights([285, 250]);
          }}
        >
          <Editor
            height={`${editorsHeights[1]}px`}
            width="100%"
            language="json"
            value={variablesContent}
            onMount={handleEditorVarsDidMount}
            onChange={handleEditorVarsOnChange}
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
    </>
  );
};

export default QueryEditor;
