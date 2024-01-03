import { Languages } from '@/types/languages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonData {
  isAuthorized: boolean;
  language: Languages;
  isShowDocs: boolean;
}

const initialState: CommonData = {
  isAuthorized: false,
  language: 'EN',
  isShowDocs: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Languages>) => {
      state.language = action.payload;
    },
    hideDocs: (state) => {
      state.isShowDocs = false;
    },
    showDocs: (state) => {
      state.isShowDocs = true;
    },
  },
});

export const { changeLanguage, showDocs, hideDocs } = commonSlice.actions;
export default commonSlice.reducer;
