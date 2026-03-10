// Listado básico (para el grid)
export interface PokemonBasic {
    name: string
    url: string
    id: number
    image: string
}

// Detalles expandidos
export interface PokemonDetail extends PokemonBasic {
    height: number
    weight: number
    types: string[]
    abilities: string[]
    stats: {
        hp: number
        attack: number
        defense: number
    }
}