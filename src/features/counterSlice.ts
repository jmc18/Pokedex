import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//Constants
import { slicesStore } from '../utils/constants'

interface CouterState {
  value: number
}

const initialState: CouterState = {
  value: 0
}

const counterSlice = createSlice({
  name: slicesStore.counterSlice,
  initialState,
  reducers: {
    increment: (state) => {
      state.value++
    },
    decrement: (state) => {
      state.value--
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload
    },
    reset: (state) => {
      state.value = 0
    }
  }
})

export const { increment, decrement, incrementByAmount, decrementByAmount, reset } = counterSlice.actions

export default counterSlice.reducer
