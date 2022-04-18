import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import PokemonView from '../../models/PokemonView'
import { slicesStore } from '../../utils/constants'

//contants
import { Colors } from '../../utils/constants'

const initialState: PokemonView = {
  id: 1,
  name: '',
  image: '',
  height: 0,
  weight: 0,
  type: '',
  move: '',
  color: Colors.unknown,
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
    setPokemon: (state, action: PayloadAction<PokemonView>) => {
      const { payload } = action
      state.id = payload.id
      state.name = payload.name
      state.image = payload.image
      state.height = payload.height
      state.weight = payload.weight
      state.type = payload.type
      state.move = payload.move
      state.color = payload.color
      state.stats = payload.stats
    }
  }
})

export const { setPokemon } = pokemonSlice.actions
export default pokemonSlice.reducer
