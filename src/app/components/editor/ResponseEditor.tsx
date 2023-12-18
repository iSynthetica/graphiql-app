import { BeforeMount, Editor, Monaco } from '@monaco-editor/react';
import { cn } from '@/utils/cn';
import styles from './editor.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ResponseEditor = () => {
  const { responseContent } = useSelector((state: RootState) => state.editor);

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
        value={responseContent}
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
