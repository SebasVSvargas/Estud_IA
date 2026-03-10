
const API_BASE = 'https://pokeapi.co/api/v2'
export const API_IMAGE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export interface PokemonApiResponse{
    results: {
        name: string
        url: string
    }[]
}

/**
 * Obtiene lista de pokémon paginada desde la API
 * @param limit - cuántos pokémon traer (default 20)
 * @param offset - desde dónde empezar (0, 20, 40...)
 */
export async function fetchPokemonList(
    limit: number = 20,
    offset: number = 0
): Promise<PokemonApiResponse> {
        const url = `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`  
        const response = await fetch(url)
    
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`)
        }
    
    return response.json()
}


/**
 * Obtiene detalles de un pokémon específico
 * @param idOrName - ID o nombre del pokémon (e.g., 1 o 'pikachu')
 */
export async function fetchPokemonDetail(idOrName: string | number) {

    const url = `${API_BASE}/pokemon/${idOrName}`  
    const response = await fetch(url)  

    if (!response.ok) {
    throw new Error(`Pokémon no encontrado: ${idOrName}`)
    }  
    return response.json()
}