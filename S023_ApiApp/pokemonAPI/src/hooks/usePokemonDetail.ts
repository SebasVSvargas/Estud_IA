import { useState, useEffect } from 'react'
import type { PokemonDetail } from '../types/pokemon'
import { API_IMAGE_BASE, fetchPokemonDetail } from '../utils/apiClient'  // ← reutilizar


export function usePokemonDetail(idOrName: string | number) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDetail()
  }, [idOrName])

async function loadDetail() {
    setLoading(true)
    setError(null)
    try {
        const data = await fetchPokemonDetail(idOrName)

        const transformedData: PokemonDetail = {
            name: data.name,
            url: data.url,
            id: data.id,
            image: `${API_IMAGE_BASE}/${data.id}.png`,
            height: data.height,
            weight: data.weight,
            types: data.types.map((t: any) => t.type.name), 
            abilities: data.abilities.map((a: any) => a.ability.name),
            stats: {
            hp: data.stats[0]?.base_stat || 0,
            attack: data.stats[1]?.base_stat || 0,
            defense: data.stats[2]?.base_stat || 0,
            }
        }

        setPokemon(transformedData)
        } catch (err: any) {
        setError(err.message)
        } finally {
        setLoading(false)
        }
    }

return { pokemon, loading, error }
}