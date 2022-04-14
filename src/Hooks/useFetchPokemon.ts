import { useState, useEffect } from 'react'
import { Pokemon, PokemonClient } from 'pokenode-ts'

interface RequestResponse {
  data?: Pokemon
  isLoading: boolean
}

export const useFetchPokemon = (pokenmonId: number): RequestResponse => {
  const [response, setResponse] = useState(
    (): RequestResponse => ({
      data: null,
      isLoading: true
    })
  )

  useEffect(() => {
    const getRequest = async (pokenmonId: number) => {
      try {
        const pokemonClient = new PokemonClient()
        const pokemon = await pokemonClient.getPokemonById(pokenmonId)
        console.log(pokemon)
        setResponse({ data: pokemon, isLoading: false })
      } catch (error: any) {
        console.log('Something went wrong', error)
      }
    }
    getRequest(pokenmonId)
    return response
  }, [])
}
