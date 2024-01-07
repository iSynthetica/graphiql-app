import styles from './editor.module.scss';
import { cn } from '@/utils/cn';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeSchemaContent, changeUrl } from '@/redux/editorSlice';
import { useEffect, useState } from 'react';
import { fetchSchema } from '@/api/graphqlFetch';

const UrlInput = () => {
  const { url } = useAppSelector((state: RootState) => state.editor);
  const [urlInput, setUrlInput] = useState<string>(url);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<{} | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(changeUrl(urlInput));
    }, 600);

    return () => clearTimeout(timer);
  }, [urlInput, dispatch]);

  useEffect(() => {
    fetchSchema(url)
      .then((data) => setData(data))
      .catch((error) => {
        console.error(error);
        setData(null);
      });
  }, [url]);

  useEffect(() => {
    dispatch(changeSchemaContent(data));
  }, [data, dispatch]);

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
