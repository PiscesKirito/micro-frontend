import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface LoginState {
  value: string
}

const initialState: LoginState = {
  value: 'Login'
}

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    say: () => {
      console.log('hello')
    }
  }
})

export const { say } = LoginSlice.actions

export const getDemoValue = (state: RootState) => state.login.value

export default LoginSlice.reducer
