import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import PokemonView from '../../models/PokemonView'
import { slicesStore } from '../../utils/constants'

const initialState: PokemonView = {
  id: 1,
  name: '',
  image: '',
  height: 0,
  weight: 0,
  type: '',
  move: '',
  stats: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  }
}

const pokemonSlice = createSlice({
  name: slicesStore.pokemonSlice,
  initialState,
  reducers: {
    setPokemon: (state: PokemonView, action: PayloadAction<PokemonView>) => {
      state = action.payload
    }
  }
})

export const { setPokemon } = pokemonSlice.actions
export default pokemonSlice.reducer
