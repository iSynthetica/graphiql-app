'use client';

import { Editor } from '@monaco-editor/react';
import { cn } from '@/utils/cn';

import QueryColumn from '../components/editor/QueryColumn';
import QueryEditor from '../components/editor/QueryEditor';
import ResponseEditor from '../components/editor/ResponseEditor';

const EditorPage = () => {
  return (
    <main className={cn('min-h-[90vh]')}>
      <div
        className={cn(
          'flex flex-row items-center justify-center bg-green-custom-800 text-white'
        )}
      >
        <div className="basis-1/2">
          <QueryColumn />
        </div>
        <div className="basis-1/2">
          <ResponseEditor />
        </div>
      </div>
    </main>
  );
};

export default EditorPage;
