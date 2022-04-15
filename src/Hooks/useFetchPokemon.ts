import { useState, useEffect } from 'react'
import { Pokemon, PokemonClient } from 'pokenode-ts'

export type RequestResponse = {
  response: any
  isLoading: boolean
}

export const useFetchPokemon = (pokenmonId: number): RequestResponse => {
  const [response, setResponse] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getRequest = async (pokenmonId: number) => {
      setIsLoading(true)
      try {
        const pokemonClient = new PokemonClient()
        const pokemon = await pokemonClient.getPokemonById(pokenmonId)
        setResponse(pokemon)
      } catch (error: any) {
        console.log('Something went wrong', error)
      }
      setIsLoading(false)
    }
    getRequest(pokenmonId)
  }, [pokenmonId])
  return { response, isLoading }
}
