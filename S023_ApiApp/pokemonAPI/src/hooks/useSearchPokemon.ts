import { useState } from 'react'
import type { PokemonBasic } from '../types/pokemon'
import { fetchPokemonDetail, API_IMAGE_BASE } from '../utils/apiClient'

export function useSearchPokemon() {
    const [result, setResult] = useState<PokemonBasic | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function search(query: string) {
        if (!query.trim()) {
            setResult(null)
            setError(null)
        return
        }

        setLoading(true)
        setError(null)

        try {
        
        const searchQuery = query.trim().toLowerCase()        
        // La API acepta ID o nombre
        const data = await fetchPokemonDetail(searchQuery)

        const pokemon: PokemonBasic = {
            name: data.name,
            url: data.url,
            id: data.id,
            image: `${API_IMAGE_BASE}/${data.id}.png`
        }

        setResult(pokemon)
        } 
        catch (err: any) {
            setError(`No se encontró: "${query}"`)
            setResult(null)
        }
        finally {
            setLoading(false)   
        }
    }

    return { result, loading, error, search }
}