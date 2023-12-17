import { BeforeMount, Editor, Monaco } from '@monaco-editor/react';
import { cn } from '@/utils/cn';
import styles from './editor.module.scss';
import { dummyResponse } from '@/data/dummyResponse';

const ResponseEditor = () => {
  const handleEditorWillMount: BeforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('customTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#e6e6e6',
      },
    });
  };
  return (
    <div className={cn(styles.editorRightCol)}>
      <Editor
        className="readOnlyEditor"
        height="600px"
        language="json"
        beforeMount={handleEditorWillMount}
        value={dummyResponse}
        options={{
          lineNumbers: 'off',
          readOnly: true,
          minimap: {
            enabled: false,
          },
          renderLineHighlight: 'none',
        }}
      />
    </div>
  );
};

export default ResponseEditor;
