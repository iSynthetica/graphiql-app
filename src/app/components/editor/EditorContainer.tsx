import {
  faMagicWandSparkles,
  faPlay,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cn } from '@/utils/cn';
import styles from './editor.module.scss';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { prettifyGraphQLQuery } from '@/utils/prettier';
import { changeQueryContent, changeResponseContent } from '@/redux/editorSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import EditorTabs from './EditorTabs';
import { hideDocs, showDocs } from '@/redux/commonSlice';
import HeadersEditor from './HeadersEditor';
import VariablesEditor from './VariablesEditor';
import QueryEditor from './QueryEditor';
import { fetchData } from '@/api/graphqlFetch';

const EditorContainer = () => {
  const { queryContent, headersContent, variablesContent, url } =
    useAppSelector((state: RootState) => state.editor);
  const dispatch = useAppDispatch();
  const [data, setData] = useState();
  const show = useAppSelector((state) => state.common.isShowDocs);

  useEffect(() => {
    if (data) {
      dispatch(changeResponseContent(JSON.stringify(data, null, 2)));
      console.log(data, typeof data, 'data');
    }
  }, [data, dispatch]);

  const runQuery = () => {
    fetchData(
      url,
      queryContent,
      JSON.parse(variablesContent),
      JSON.parse(headersContent)
    )
      .then((data) => setData(data))
      .catch((error) => console.error(error));
    console.log({ queryContent }, typeof queryContent);
    console.log({ headersContent }, typeof headersContent);
    console.log({ variablesContent }, typeof variablesContent);
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
