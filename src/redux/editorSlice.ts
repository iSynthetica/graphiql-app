import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dummyQuery, dunmyHeaders, dummyVariables } from '@/data/dummyQuery';
import { dummyResponse } from '@/data/dummyResponse';

export interface EditorData {
  queryContent: string;
  headersContent: string;
  variablesContent: string;
  responseContent: string;
}

const initialState: EditorData = {
  queryContent: dummyQuery,
  headersContent: dunmyHeaders,
  variablesContent: dummyVariables,
  responseContent: dummyResponse,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    changeQueryContent: (state, action: PayloadAction<string>) => {
      state.queryContent = action.payload;
    },
    changeResponseContent: (state, action: PayloadAction<string>) => {
      state.responseContent = action.payload;
    },
  },
});

export const { changeQueryContent, changeResponseContent } =
  editorSlice.actions;
export default editorSlice.reducer;
