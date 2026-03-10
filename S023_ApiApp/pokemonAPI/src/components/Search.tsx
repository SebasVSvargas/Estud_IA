import { useState } from 'react'
import { useSearchPokemon } from '../hooks/useSearchPokemon'
import '../Search.css'

interface Props {
    onResultSelect: (pokemonId: number) => void
}

export function Search({ onResultSelect }: Props) {
    const [query, setQuery] = useState('')
    const [showResult, setShowResult] = useState(false)
    const { result, loading, error, search } = useSearchPokemon()

    const handleSearch = (e: React.ChangeEvent) => {
        e.preventDefault()
        search(query)
        setShowResult(true)
    }

    const handleSelectResult = () => {
        if (result) {
        onResultSelect(result.id)
        setShowResult(false)
        setQuery('')
        }
    }

    return (
        <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
            <input
            type="text"
            placeholder="Busca por nombre o ID (ej: pikachu o 25)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            />
            <button type="submit" className="search-btn">
            🔍 Buscar
            </button>
        </form>

        {/* Mostrar resultado */}
        {showResult && (
            <div className="search-result">
            {loading && <p>⏳ Buscando...</p>}
            
            {error && <p className="search-error">❌ {error}</p>}
            
            {result && (
                <div className="result-card">
                <img src={result.image} alt={result.name} />
                <h3>{result.name}</h3>
                <p>#{result.id}</p>
                <button 
                    onClick={handleSelectResult}
                    className="result-btn"
                >
                    Ver detalles
                </button>
                </div>
            )}

            <button 
                onClick={() => setShowResult(false)}
                className="close-result-btn"
            >
                Cerrar
            </button>
            </div>
        )}
        </div>
    )
}