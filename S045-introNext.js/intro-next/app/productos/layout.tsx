
// app/productos/layout.tsx
'use client'

import { ReactNode } from 'react';

export default function ProductosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Barra lateral con filtros */}
      <aside className="w-64 bg-blue-100 rounded-lg shadow p-6 text-gray-700">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Categoría</h3>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:text-blue-600">Electrónica</li>
              <li className="cursor-pointer hover:text-blue-600">Accesorios</li>
              <li className="cursor-pointer hover:text-blue-600">Gaming</li>
              <li className="cursor-pointer hover:text-blue-600">Audio</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Precio</h3>
            <div className="text-sm">$0 - $2000</div>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}