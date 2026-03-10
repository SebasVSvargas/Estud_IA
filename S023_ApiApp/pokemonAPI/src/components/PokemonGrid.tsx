import type { PokemonBasic } from '../types/pokemon'
import { PokemonCard } from './PokemonCard'
import '../App.css'

interface Props {
  pokemon: PokemonBasic[]
  onSelectPokemon: (id: number) => void
}

export function PokemonGrid({ pokemon , onSelectPokemon}: Props) {
  return (
    <div className="grid">
      {pokemon.map(poke => (
        <PokemonCard 
            key={poke.id} 
            pokemon={poke} 
            onClick={() => onSelectPokemon(poke.id)}
        />
      ))}
    </div>
  )
}