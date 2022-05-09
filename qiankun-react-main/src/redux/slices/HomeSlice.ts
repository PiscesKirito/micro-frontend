import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface HomeState {
  user: string
}

const initialState: HomeState = {
  user: ''
}

export const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = HomeSlice.actions

export const getUser = (state: RootState) => state.home.user

export default HomeSlice.reducer