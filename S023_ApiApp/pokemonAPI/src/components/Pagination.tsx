interface Props {
  page: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, onPageChange }: Props) {
    return (
        <div className="pagination">
            <button 
                onClick={() => onPageChange(Math.max(0, page - 1))}
                disabled={page === 0}
            >
                ← Anterior
            </button>
            <span>Página {page + 1}</span>
            <button onClick={() => onPageChange(page + 1)}>
                Siguiente →
            </button>
        </div>
    )
}