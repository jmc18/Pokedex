import { useState, useEffect } from 'react'
import { PokemonClient } from 'pokenode-ts'

export type RequestResponse = {
  response: any
  isLoading: boolean
}

export const useFetchPokemon = (pokenmonId: number): RequestResponse => {
  const [response, setResponse] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getRequest = async (pokenmonId: number) => {
      try {
        const pokemonClient = new PokemonClient()
        await pokemonClient.getPokemonById(pokenmonId).then((pokemon) => setResponse(pokemon))
      } catch (error: any) {
        console.log('Something went wrong', error)
      }
      setIsLoading(false)
    }
    getRequest(pokenmonId)
  }, [pokenmonId])
  return { response, isLoading }
}
