import { usePokemonDetail } from '../hooks/usePokemonDetail'
import '../app.css'

interface Props {
  pokemonId: number
  onClose: () => void
}

export function PokemonModal({ pokemonId, onClose }: Props) {
    const { pokemon, loading } = usePokemonDetail(pokemonId)

return (
    <div className="modal-wrapper" onClick={onClose}>
      {/* Backdrop - clickear cierra modal */}
        <div className="modal-backdrop" />
        
        {/* Contenido - NO cierra si clickeas aquí */}
        <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevenir cierre
        >
            <button className="modal-close" onClick={onClose}>✕</button>

            {loading ? (
            <p>Cargando...</p>
            ) : pokemon ? (
            <>
                <img src={pokemon.image} alt={pokemon.name} />
                <h2>{pokemon.name}</h2>
                <p>#{pokemon.id}</p>

                <div className="modal-stats">
                <p><strong>Altura:</strong> {pokemon.height / 10}m</p>
                <p><strong>Peso:</strong> {pokemon.weight / 10}kg</p>
                <p><strong>Tipos:</strong> {pokemon.types?.join(', ')}</p>
                <p><strong>Habilidades:</strong> {pokemon.abilities?.join(', ')}</p>
                
                <div className="stats-grid">
                    <div>HP: {pokemon.stats.hp}</div>
                    <div>ATK: {pokemon.stats.attack}</div>
                    <div>DEF: {pokemon.stats.defense}</div>
                </div>
                </div>
            </>
            ) : null}
        </div>
    </div>
    )
}