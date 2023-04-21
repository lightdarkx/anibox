import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface authState {
  user_id: number
  isLoggedIn: boolean
}

const initialAuthSlice: authState = { user_id: 0, isLoggedIn: false }

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthSlice,
  reducers: {
    setUserId(state, action: PayloadAction<number>) {
      state.user_id = action.payload
    },
    toggleLoggedIn(state) {
      state.isLoggedIn = !state.isLoggedIn
    },
    resetState(state) {
      state.user_id = 0
      state.isLoggedIn = false
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
