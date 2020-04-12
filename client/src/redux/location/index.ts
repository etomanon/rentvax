import { Location } from './../../utils/types/location'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface State {
  address?: Location
}

const initialState = {
  address: undefined,
}

const slice = createSlice({
  name: 'location',
  initialState: initialState as State,
  reducers: {
    locationSet: (state, action: PayloadAction<Location | undefined>) => {
      state.address = action.payload
    },
  },
})

export const { locationSet } = slice.actions

export default slice.reducer
