import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//Constants
import { slicesStore } from '../utils/constants'

interface CouterState {
  value: number
}

const initialState: CouterState = {
  value: 1
}

const counterSlice = createSlice({
  name: slicesStore.counterSlice,
  initialState,
  reducers: {
    increment: (state) => {
      if (state.value < 897) state.value++
    },
    decrement: (state) => {
      if (state.value > 1) state.value--
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.value + action.payload > 897) {
        state.value = 898
        return
      }
      state.value += action.payload
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      if (state.value - action.payload < 2) {
        state.value = 1
        return
      }
      state.value -= action.payload
    },
    reset: (state) => {
      state.value = 0
    }
  }
})

export const { increment, decrement, incrementByAmount, decrementByAmount, reset } = counterSlice.actions

export default counterSlice.reducer
