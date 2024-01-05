import {
  faMagicWandSparkles,
  faPlay,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cn } from '@/utils/cn';
import styles from './editor.module.scss';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { prettifyGraphQLQuery } from '@/utils/prettier';
import { changeQueryContent } from '@/redux/editorSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { createGraphqlApi } from '@/api/graphql';
import EditorTabs from './EditorTabs';
import { hideDocs, showDocs } from '@/redux/commonSlice';
import HeadersEditor from './HeadersEditor';
import VariablesEditor from './VariablesEditor';
import QueryEditor from './QueryEditor';

const EditorContainer = () => {
  const { queryContent, headersContent, variablesContent, url } =
    useAppSelector((state: RootState) => state.editor);
  const dispatch = useAppDispatch();
  const graphqlApi = createGraphqlApi(url);
  const { useFetchSchemaQuery } = graphqlApi;
  const { data, isLoading, isError, refetch } = useFetchSchemaQuery(
    {},
    {
      skip: false,
    }
  );
  const show = useAppSelector((state) => state.common.isShowDocs);

  useEffect(() => {
    if (data) {
      console.log(data, typeof data, 'schema');
    }
  }, [data]);

  const runQuery = () => {
    // TODO: Implement query
    console.log({ queryContent });
    console.log({ headersContent });
    console.log({ variablesContent });
  };

  const runDoc = () => {
    dispatch(show ? hideDocs() : showDocs());
  };

  const runPrettier = () => {
    const updateQuery = prettifyGraphQLQuery(queryContent);
    if (updateQuery) {
      dispatch(changeQueryContent(updateQuery));
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
  });

  return (
    <>
      <h1 className={styles.urlHeader}>{url}</h1>
      <div className={cn(styles.editorQueryContainer, 'mb-2')}>
        <div className={cn(styles.editorQueryContainerBg)}></div>
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
        <QueryEditor />
      </div>
      <EditorTabs />
      <HeadersEditor />
      <VariablesEditor />
    </>
  );
};

export default EditorContainer;
