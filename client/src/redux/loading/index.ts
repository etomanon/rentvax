import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'loading',
  initialState: 0,
  reducers: {
    loadingAdd: (state) => state + 1,
    loadingRemove: (state) => state - 1,
  },
})

export const { loadingAdd, loadingRemove } = slice.actions

export default slice.reducer
