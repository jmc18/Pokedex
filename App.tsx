import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, Text, View } from 'react-native'

import { Provider } from 'react-redux'
import { store } from './src/app/store'

//components
import PokemonList from './src/components/PokemonList'

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <PokemonList />
      </View>
    </Provider>
  )
}
