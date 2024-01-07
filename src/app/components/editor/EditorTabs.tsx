import { RootState } from '@/redux/store';
import styles from './editor.module.scss';
import { cn } from '@/utils/cn';
import { setTab } from '@/redux/controlSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { ILocalizationContext } from '@/context/localization';
import { useContext } from 'react';

function EditorTabs() {
  const { language, localization } = useContext(ILocalizationContext);
  const { tab } = useAppSelector((state: RootState) => state.control);
  const dispatch = useAppDispatch();
  return (
    <nav className={styles.editorTabNav}>
      <ul>
        <li className={cn(tab === 'headers' ? styles.editorTabNavActive : '')}>
          <button onClick={() => dispatch(setTab('headers'))}>
            {localization[language].headersTab}
          </button>
        </li>
        <li
          className={cn(tab === 'variables' ? styles.editorTabNavActive : '')}
        >
          <button onClick={() => dispatch(setTab('variables'))}>
            {localization[language].variablesTab}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default EditorTabs;
