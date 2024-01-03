import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ControlData {
  tab: 'headers' | 'variables';
}

const initialState: ControlData = {
  tab: 'headers',
};

const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<'headers' | 'variables'>) => {
      state.tab = action.payload;
    },
  },
});

export const { changeTab } = controlSlice.actions;

export default controlSlice.reducer;
