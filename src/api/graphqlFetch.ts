import { schemaBody } from '@/data/schemaBody';

export const fetchSchema = async (url: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(schemaBody),
  });
  const result = await response.json();
  return result;
};

export const fetchData = async (
  url: string,
  query: string,
  variables: {},
  headersObject: {}
) => {
  const headers = {
    'Content-Type': 'application/json',
    ...headersObject,
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
