import { Editor } from '@monaco-editor/react';
import { cn } from '@/utils/cn';
import styles from './editor.module.scss';
import { dummyQuery } from '@/data/dummyQuery';

const QueryEditor = () => {
  return (
    <div className={cn(styles.editorLeftCol)}>
      <Editor
        height="600px"
        language="graphql"
        value={dummyQuery}
        options={{
          minimap: {
            enabled: false,
          },
          renderLineHighlight: 'none',
        }}
      />
    </div>
  );
};

export default QueryEditor;
