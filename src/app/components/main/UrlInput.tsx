import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './editor.module.scss';
import { ILocalizationContext } from '@/context/localization';
import { cn } from '@/utils/cn';
import { RootState } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { changeSchemaContent, changeUrl } from '@/redux/editorSlice';
import { useContext, useEffect, useState } from 'react';
import { fetchSchema } from '@/api/graphqlFetch';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const UrlInput = () => {
  const { language, localization } = useContext(ILocalizationContext);
  const { url } = useAppSelector((state: RootState) => state.editor);
  const [urlInput, setUrlInput] = useState<string>(url);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<{} | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
  };

  const handleClick = () => {
    dispatch(changeUrl(urlInput));
  };

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

  const border = `border-b-4 border-green-800`;

  return (
    <div className={cn(styles.urlInputContainer)}>
      <input
        className={cn('border-gray-500 border-2', styles.urlInput)}
        type="text"
        value={urlInput}
        onChange={handleChange}
      />
      <button
        className={styles.urlBtn}
        title={localization[language].changeEndpointBtn}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
};

export default UrlInput;
