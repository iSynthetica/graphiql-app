'use client';

import { Editor } from '@monaco-editor/react';
import { cn } from '@/utils/cn';
import styles from './styles.module.scss';

import QueryEditor from '../components/editor/QueryEditor';
import ResponseEditor from '../components/editor/ResponseEditor';

const jsonEditorContent = `{
  "hello": "world"
}`;

const EditorPage = () => {
  return (
    <main className={cn('min-h-[90vh]')}>
      <div
        className={cn(
          'flex flex-row items-center justify-center bg-green-custom-800 text-white',
          styles.editorsContainer
        )}
      >
        <div className="basis-1/2">
          <QueryEditor />
        </div>
        <div className="basis-1/2">
          <ResponseEditor />
        </div>
      </div>
    </main>
  );
};

export default EditorPage;
