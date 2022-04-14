import { View, Text } from 'react-native'

import { useFetchPokemon } from '../Hooks/useFetchPokemon'

const PokemonList = () => {
  const { data, isLoading } = useFetchPokemon(1)
  return (
    <View>
      <Text>Pokemon List</Text>
    </View>
  )
}

export default PokemonList
