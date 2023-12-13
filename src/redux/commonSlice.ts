import { Languages } from '@/types/languages';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonData {
  isAuthorized: boolean;
  language: Languages;
}

const initialState: CommonData = {
  isAuthorized: false,
  language: 'EN',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Languages>) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = commonSlice.actions;
export default commonSlice.reducer;
