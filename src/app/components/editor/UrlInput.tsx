import styles from './editor.module.scss';
import { cn } from '@/utils/cn';

const UrlInput = () => {
  return (
    <div className={cn(styles.urlInputContainer)}>
      <input
        className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
        type="text"
      />
    </div>
  );
};

export default UrlInput;
