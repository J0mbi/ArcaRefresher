import { createSlice } from '@reduxjs/toolkit';
import { getValue } from 'core/storage';
import { MODULE_ID } from './ModuleInfo';

const defaultConfigState = {
  // r: right click
  // sr: shift + right click
  // cr: ctrl + right click
  interactionType: 'r',
};

const initialState = {
  config: getValue(MODULE_ID, defaultConfigState),
  open: false,
  snack: false,
  snackTime: null,
};

export const slice = createSlice({
  name: MODULE_ID,
  initialState,
  reducers: {
    setInteraction(state, action) {
      state.config.interactionType = action.payload;
    },
    setOpen(state) {
      state.open = true;
    },
    setClose(state) {
      state.open = false;
    },
    setContextSnack(state, action) {
      const { msg, time } = action.payload;
      state.snack = msg;
      state.snackTime = time || null;
    },
  },
});

export const { setInteraction, setOpen, setClose, setContextSnack } =
  slice.actions;

export default slice.reducer;
