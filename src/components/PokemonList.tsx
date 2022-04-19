import { useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import { AntDesign, Octicons, Entypo, Ionicons } from '@expo/vector-icons'

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

//Components
import StatLine from './StatLine'

const PokemonList = () => {
  const dispatch = useAppDispatch()
  const currentPokemon = useAppSelector((state) => state.pokemon)
  const counter = useAppSelector((state) => state.counter.value)

  const { response, isLoading } = useFetchPokemon(counter)

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

  useEffect(() => {
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
  }, [response, dispatch, isLoading])

  if (isLoading) {
    return (
      <View>
        <Text>Loading Pokemon...</Text>
      </View>
    )
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
        <View style={{ ...styles.row, height: 250 }}>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => handleButtons(buttonActions.PREV)}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <AntDesign name="doubleleft" size={24} color="black" onPress={() => handleButtons(buttonActions.PREVHUNDRED)} />
            </TouchableOpacity>
          </View>
          <Image style={styles.pokemonImage} source={{ uri: currentPokemon.image }} />
          <View>
            <TouchableOpacity style={styles.button} onPress={() => handleButtons(buttonActions.NEXT)}>
              <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtons(buttonActions.NEXTHUNDRED)}>
              <AntDesign name="doubleright" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dataSheet}>
          <View style={{ ...styles.pokemontypeContainer, backgroundColor: currentPokemon.color, alignSelf: 'center', marginTop: 15 }}>
            <Text
              style={{
                color: Colors.white,
                paddingHorizontal: 10,
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
                textTransform: 'capitalize'
              }}
            >
              {currentPokemon.type}
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 20, color: currentPokemon.color }}>About</Text>
            <View style={{ ...styles.row, justifyContent: 'space-around', marginTop: 20 }}>
              <View>
                <Text style={{ textAlign: 'center' }}>
                  <Octicons name="law" size={24} color="black" />
                  {` ${currentPokemon.weight} Kg`}
                </Text>
                <Text style={{ textAlign: 'center' }}>Weight</Text>
              </View>
              <View>
                <Text style={{ textAlign: 'center' }}>
                  <Entypo name="ruler" size={24} color="black" />
                  {` ${currentPokemon.height} m`}
                </Text>
                <Text style={{ textAlign: 'center' }}>Height</Text>
              </View>
              <View>
                <Text style={{ textAlign: 'center' }}>
                  <Ionicons name="move" size={24} color="black" />
                  {` ${currentPokemon.move}`}
                </Text>
                <Text style={{ textAlign: 'center' }}>Move</Text>
              </View>
            </View>
            <View>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 20, color: Colors.mediumGray }}>
                Base Stats
              </Text>
              <View style={{ ...styles.row, justifyContent: 'flex-start', marginHorizontal: 30, marginTop: 20 }}>
                <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                  <Text>HP</Text>
                  <Text>Attack</Text>
                  <Text>Defense</Text>
                  <Text>Special Attack</Text>
                  <Text>Special Defence</Text>
                  <Text>Speed</Text>
                </View>
                <View style={{ height: 100, width: 2, backgroundColor: Colors.mediumGray }} />
                <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                  <StatLine color={currentPokemon.color} number={currentPokemon.stats?.hp} />
                  <StatLine color={currentPokemon.color} number={currentPokemon.stats?.attack} />
                  <StatLine color={currentPokemon.color} number={currentPokemon.stats?.defense} />
                  <StatLine color={currentPokemon.color} number={currentPokemon.stats?.specialAttack} />
                  <StatLine color={currentPokemon.color} number={currentPokemon.stats?.specialDefense} />
                  <StatLine color={currentPokemon.color} number={currentPokemon.stats?.speed} />
                </View>
              </View>
            </View>
          </View>
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
    textTransform: 'capitalize',
    marginTop: 30
  },
  pokemonImage: {
    width: 200,
    height: 200
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white + '70',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pokemontypeContainer: {
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dataSheet: {
    bottom: 30,
    left: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    width: '95%',
    height: '60%'
  }
})

export default PokemonList
