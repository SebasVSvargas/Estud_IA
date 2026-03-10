import { useState } from 'react'
import { usePokemonList } from './hooks/usePokemonList'
import { Search } from './components/Search'
import { PokemonGrid } from './components/PokemonGrid'
import { Pagination } from './components/Pagination'
import { PokemonModal } from './components/PokemonModal'
import './App.css'

function App() {
  const [page, setPage] = useState(0)
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null)
  const { pokemonList, loading, error } = usePokemonList(page)

  return (
    <>
      <h1>Pokédex</h1>
      
      {/* ← AGREGAR AQUÍ */}
      <Search onResultSelect={setSelectedPokemonId} />
      
      {loading && <p className="loading">⏳ Cargando...</p>}
      {error && <p className="error">❌ {error}</p>}
      
      <PokemonGrid 
        pokemon={pokemonList} 
        onSelectPokemon={setSelectedPokemonId}
      />
      
      <Pagination page={page} onPageChange={setPage} />

      {selectedPokemonId && (
        <PokemonModal 
          pokemonId={selectedPokemonId}
          onClose={() => setSelectedPokemonId(null)}
        />
      )}
    </>
  )
}

export default App