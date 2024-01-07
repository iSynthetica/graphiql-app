import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ControlData {
  tab: 'headers' | 'variables';
  editorsHeights: [number, number];
}

const initialState: ControlData = {
  tab: 'headers',
  editorsHeights: [390, 145],
};

const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<'headers' | 'variables'>) => {
      state.tab = action.payload;
    },
    setEditorsHeights: (state, action: PayloadAction<[number, number]>) => {
      state.editorsHeights = action.payload;
    },
  },
});

export const { setTab, setEditorsHeights } = controlSlice.actions;

export default controlSlice.reducer;
