import { useState, useEffect } from 'react'
import type { PokemonBasic } from '../types/pokemon'
import { API_IMAGE_BASE, fetchPokemonList } from '../utils/apiClient'

export function usePokemonList(page: number = 0) {

    const [pokemonList, setPokemonList] = useState<PokemonBasic[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const ITEMS_PER_PAGE = 16

    useEffect(() => {
        loadPokemon()
    }, [page])

async function loadPokemon() {    
    setLoading(true)
    setError(null)
    // try{
    //     const offset = page * 20
    //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch Pokémon list')

    try {
        const offset = page * ITEMS_PER_PAGE
        const data = await fetchPokemonList(ITEMS_PER_PAGE, offset)

        // Transformar datos
        const transformed: PokemonBasic[] = data.results.map(
            (pokemon: any, index: number) => {
            const id = offset + index + 1
            return {
                name: pokemon.name,
                url: pokemon.url,
                id,
                image: `${API_IMAGE_BASE}/${id}.png`
            }
        })
        setPokemonList(transformed)
    } catch (err: any) {
        setError(err.message || 'Unknown error')
    } finally {
        setLoading(false)
    }
}
    return { pokemonList, loading, error }
}