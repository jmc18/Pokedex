import { View, Text } from 'react-native'

//Hooks
import { useAppDispatch, useAppSelector } from '../Hooks/useStore'
import { useFetchPokemon } from '../Hooks/useFetchPokemon'

//Slices
import { setPokemon } from '../features/pokemon/pokemonSlice'
import { increment, decrement, incrementByAmount, decrementByAmount } from '../features/counterSlice'

//Models
import PokemonView, { Stats } from '../models/PokemonView'

const PokemonList = () => {
  const dispatch = useAppDispatch()
  const currentPokemon = useAppSelector((state) => state.pokemon)
  const counter = useAppSelector((state) => state.counter)

  const { response, isLoading } = useFetchPokemon(1)

  if (!isLoading) {
    const currentPokemonStats: Stats = {
      hp: response?.stats[0].base_stat,
      attack: response?.stats[1].base_stat,
      defense: response?.stats[2].base_stat,
      specialAttack: response?.stats[3].base_stat,
      specialDefense: response?.stats[4].base_stat,
      speed: response?.stats[5].base_stat
    }
    const pokemonData: PokemonView = {
      id: response?.id,
      name: response?.name,
      image: response?.sprites?.front_default?.toString(),
      height: response?.height,
      weight: response?.weight,
      type: response?.types[0]?.type?.name?.toString(),
      move: response?.moves[0]?.move?.name?.toString(),
      stats: currentPokemonStats
    }
    dispatch(setPokemon(pokemonData))
  }

  const handlerNextButton = () => {
    dispatch(increment())
  }

  return (
    <View>
      <Text>Pokemon List</Text>
    </View>
  )
}

export default PokemonList
