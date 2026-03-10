import type { PokemonBasic } from '../types/pokemon'

interface Props {
    pokemon: PokemonBasic
    onClick: () => void
}

export function PokemonCard({ pokemon, onClick }: Props) {
    // const [expanded, setExpanded] = useState(false)
    // const { pokemon: details, loading } = usePokemonDetail(pokemon.id)

    return (
        <div className="card" onClick={onClick}>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>#{pokemon.id}</p>

            {/* {expanded && (
                <div className="details">
                    {loading && <p>Cargando detalles...</p>}
                    {details && (
                        <>
                        <p>Altura: {details.height / 10}m</p>
                        <p>Peso: {details.weight / 10}kg</p>
                        <p>Tipos: {details.types?.join(', ')}</p>
                        <p>Habilidades: {details.abilities?.join(', ')}</p>
                        <p>HP: {details.stats.hp}</p>
                        <p>Ataque: {details.stats.attack}</p>
                        <p>Defensa: {details.stats.defense}</p>
                        </>
                    )}
                </div>
            )} */}
        </div>
    )
}