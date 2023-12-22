import styles from './editor.module.scss';
import { cn } from '@/utils/cn';

import QueryEditor from './QueryEditor';
import UrlInput from './UrlInput';

const QueryColumn = () => {
  return (
    <div className={cn(styles.editorLeftCol)}>
      <UrlInput />
      <QueryEditor />
    </div>
  );
};

export default QueryColumn;
