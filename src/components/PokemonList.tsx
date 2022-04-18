import { useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, useColorScheme, SafeAreaView, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

//Hooks
import { useAppDispatch, useAppSelector } from '../Hooks/useStore'
import { useFetchPokemon } from '../Hooks/useFetchPokemon'

//Slices
import { setPokemon } from '../features/pokemon/pokemonSlice'
import { increment, decrement, incrementByAmount, decrementByAmount } from '../features/counterSlice'

//Models
import PokemonView, { Stats } from '../models/PokemonView'

//Constant
import { buttonActions, Colors } from '../utils/constants'

const PokemonList = () => {
  const dispatch = useAppDispatch()
  const currentPokemon = useAppSelector((state) => state.pokemon)
  const counter = useAppSelector((state) => state.counter)

  const { response, isLoading } = useFetchPokemon(counter.value)

  if (isLoading) {
    return (
      <View>
        <Text>Loading Pokemon...</Text>
      </View>
    )
  }

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
      color:
        response?.types[0]?.type?.name?.toString() === 'grass'
          ? Colors.grass
          : response?.types[0]?.type?.name?.toString() === 'fire'
          ? Colors.fire
          : response?.types[0]?.type?.name?.toString() === 'water'
          ? Colors.water
          : response?.types[0]?.type?.name?.toString() === 'electric'
          ? Colors.electric
          : response?.types[0]?.type?.name?.toString() === 'ice'
          ? Colors.ice
          : response?.types[0]?.type?.name?.toString() === 'fighting'
          ? Colors.fighting
          : response?.types[0]?.type?.name?.toString() === 'poison'
          ? Colors.poison
          : response?.types[0]?.type?.name?.toString() === 'ground'
          ? Colors.ground
          : response?.types[0]?.type?.name?.toString() === 'flying'
          ? Colors.flying
          : response?.types[0]?.type?.name?.toString() === 'psychic'
          ? Colors.psychic
          : response?.types[0]?.type?.name?.toString() === 'bug'
          ? Colors.bug
          : response?.types[0]?.type?.name?.toString() === 'rock'
          ? Colors.rock
          : response?.types[0]?.type?.name?.toString() === 'ghost'
          ? Colors.ghost
          : response?.types[0]?.type?.name?.toString() === 'dragon'
          ? Colors.dragon
          : response?.types[0]?.type?.name?.toString() === 'dark'
          ? Colors.dark
          : response?.types[0]?.type?.name?.toString() === 'steel'
          ? Colors.steel
          : response?.types[0]?.type?.name?.toString() === 'fairy'
          ? Colors.fairy
          : response?.types[0]?.type?.name?.toString() === 'normal'
          ? Colors.normal
          : Colors.black,
      stats: currentPokemonStats
    }
    dispatch(setPokemon(pokemonData))
  }

  const handleButtons = (action: string): void => {
    switch (action) {
      case buttonActions.NEXT:
        dispatch(increment())
        break
      case buttonActions.PREV:
        dispatch(decrement())
        break
      case buttonActions.NEXTHUNDRED:
        dispatch(incrementByAmount(100))
        break
      case buttonActions.PREVHUNDRED:
        dispatch(decrementByAmount(100))
        break
    }
  }

  return (
    <View style={{ ...styles.constainer, backgroundColor: currentPokemon.color }}>
      <StatusBar barStyle="light-content" />
      <Image style={styles.pokeball} source={require('../../assets/Pokeball.png')} />
      <SafeAreaView>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.pokemonName}>{currentPokemon.name}</Text>
          <Text style={{ ...styles.pokemonName, textAlign: 'right', marginRight: 20, fontSize: 25 }}>#{currentPokemon.id}</Text>
        </View>
        <View>
          <View>
            <TouchableOpacity style={styles.button}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <AntDesign name="doubleleft" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button}>
              <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <AntDesign name="doubleright" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Image style={styles.pokemonImage} source={{ uri: currentPokemon.image }} />
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.unknown
  },
  pokeball: {
    position: 'absolute',
    right: 20,
    top: 50
  },
  pokemonName: {
    fontSize: 35,
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 20,
    textTransform: 'capitalize'
  },
  pokemonImage: {},
  button: {}
})

export default PokemonList
