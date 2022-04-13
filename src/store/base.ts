import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const baseSlice = createSlice({
  name: 'base',
  initialState: {
    isDark: true,
  },
  reducers: {
    // use  redux-create-reducer
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = baseSlice;

// Extract and export each action creator by name
export const { setIsDark } = actions;

// Export the reducer, either as a default or named export
export const baseReducer = reducer;
