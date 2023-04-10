import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
  value: string
}

const initialState: ThemeState = {
  value: '1'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { update } = themeSlice.actions

export default themeSlice.reducer
