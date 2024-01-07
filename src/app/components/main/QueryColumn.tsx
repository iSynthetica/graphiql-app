import styles from './editor.module.scss';
import { cn } from '@/utils/cn';

import EditorContainer from './EditorContainer';
import UrlInput from './UrlInput';

const QueryColumn = () => {
  return (
    <div className={cn(styles.editorLeftCol)}>
      <UrlInput />
      <EditorContainer />
    </div>
  );
};

export default QueryColumn;
