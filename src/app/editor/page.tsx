'use client';
import { useAuth } from '@/context/AuthContext';
import { IAuthContextValue } from '@/types/interfaces';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QueryColumn from '../components/editor/QueryColumn';
import ResponseEditor from '../components/editor/ResponseEditor';
import { Spinner } from '../components/spinner';

const EditorPage = () => {
  const { user } = useAuth() as IAuthContextValue;
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  return loading ? (
    <Spinner />
  ) : user ? (
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
  ) : (
    router.push('/')
  );
};

export default EditorPage;
