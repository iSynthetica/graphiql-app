'use client';
import { useAuth } from '@/context/AuthContext';
import { IAuthContextValue } from '@/types/interfaces';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QueryColumn from '../components/editor/QueryColumn';
import ResponseEditor from '../components/editor/ResponseEditor';
import { Spinner } from '../components/spinner';
import AutoGeneratedDocs from '../components/docs/autoGeneratedDocs';
import { useAppSelector } from '@/redux/hook';
import { tree } from 'next/dist/build/templates/app-page';

const EditorPage = () => {
  const { user } = useAuth() as IAuthContextValue;
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const show = useAppSelector((state) => state.common.isShowDocs);

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
          'flex flex-col lg:flex-row items-center justify-center bg-green-custom-800 text-white'
        )}
      >
        {show && (
          <div className={`max-h-[90vh] overflow-y-auto basis-1/5`}>
            <AutoGeneratedDocs />
          </div>
        )}
        <div className="basis-2/5">
          <QueryColumn />
        </div>
        <div className="basis-2/5">
          <ResponseEditor />
        </div>
      </div>
    </main>
  ) : (
    router.push('/')
  );
};

export default EditorPage;
