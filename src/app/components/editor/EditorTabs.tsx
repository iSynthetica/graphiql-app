import { RootState } from '@/redux/store';
import styles from './editor.module.scss';
import { cn } from '@/utils/cn';
import { setTab } from '@/redux/controlSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

function EditorTabs() {
  const { tab } = useAppSelector((state: RootState) => state.control);
  const dispatch = useAppDispatch();
  return (
    <nav className={styles.editorTabNav}>
      <ul>
        <li className={cn(tab === 'headers' ? styles.editorTabNavActive : '')}>
          <button onClick={() => dispatch(setTab('headers'))}>Headers</button>
        </li>
        <li
          className={cn(tab === 'variables' ? styles.editorTabNavActive : '')}
        >
          <button onClick={() => dispatch(setTab('variables'))}>
            Variables
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default EditorTabs;
