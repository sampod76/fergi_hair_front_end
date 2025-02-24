import { createSlice } from '@reduxjs/toolkit';
type TGlobalState = {
  collapse: boolean;
};

const initialState: TGlobalState = {
  collapse: false,
};
const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    toggleCollapse: (
      state,
      { payload }: { payload: { collapse?: boolean } }
    ) => {
      console.log(state.collapse);
      state.collapse = payload?.collapse || !state.collapse;
    },
  },
});

export default globalSlice.reducer;

export const { toggleCollapse } = globalSlice.actions;
