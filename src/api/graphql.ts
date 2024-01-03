import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { schemaBody } from '@/data/schemaBody';

export const createGraphqlApi = (baseUrl: string) => {
  return createApi({
    baseQuery: fetchBaseQuery({
      baseUrl,
    }),
    endpoints: (builder) => ({
      fetchSchema: builder.query({
        query: () => ({
          url: '/',
          method: 'POST',
          body: schemaBody,
        }),
      }),
    }),
  });
};

export const graphqlApi = createGraphqlApi(
  'https://rickandmortyapi.com/graphql'
);

export const { useFetchSchemaQuery } = graphqlApi;
