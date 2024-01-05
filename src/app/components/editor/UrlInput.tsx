import { useSelector } from 'react-redux';
import styles from './editor.module.scss';
import { cn } from '@/utils/cn';
import { RootState } from '@/redux/store';
import { useFetchSchemaQuery } from '@/api/graphql';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeUrl } from '@/redux/editorSlice';
import { useEffect, useState } from 'react';

const UrlInput = () => {
  const { url } = useAppSelector((state: RootState) => state.editor);
  const [urlInput, setUrlInput] = useState<string>(url);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, refetch } = useFetchSchemaQuery(
    {},
    {
      skip: true,
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(changeUrl(urlInput));
    }, 600);

    return () => clearTimeout(timer);
  }, [urlInput, dispatch]);
  return (
    <div className={cn(styles.urlInputContainer)}>
      <input
        className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
        type="text"
        value={urlInput}
        onChange={handleChange}
      />
    </div>
  );
};

export default UrlInput;
