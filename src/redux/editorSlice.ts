import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dummyQuery, dunmyHeaders, dummyVariables } from '@/data/dummyQuery';

export interface EditorData {
  url: string;
  queryContent: string;
  headersContent: string;
  variablesContent: string;
  responseContent: string;
  docsContent: string;
  schemaContent: {} | null;
}

const initialState: EditorData = {
  url: '',
  queryContent: '',
  headersContent: '',
  variablesContent: '',
  responseContent: '',
  docsContent: '',
  schemaContent: null,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    changeUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    changeQueryContent: (state, action: PayloadAction<string>) => {
      state.queryContent = action.payload;
    },
    changeResponseContent: (state, action: PayloadAction<string>) => {
      state.responseContent = action.payload;
    },
    changeVariablesContent: (state, action: PayloadAction<string>) => {
      state.variablesContent = action.payload;
    },
    changeHeadersContent: (state, action: PayloadAction<string>) => {
      state.headersContent = action.payload;
    },
    changeSchemaContent: (state, action: PayloadAction<{} | null>) => {
      state.schemaContent = action.payload;
    },
  },
});

export const {
  changeUrl,
  changeQueryContent,
  changeResponseContent,
  changeVariablesContent,
  changeHeadersContent,
  changeSchemaContent,
} = editorSlice.actions;

export default editorSlice.reducer;
