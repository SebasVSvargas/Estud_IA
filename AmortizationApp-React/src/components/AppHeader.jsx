import React from 'react';
import { Calculator } from 'lucide-react';

const tabs = ['summary', 'strategy', 'table', 'charts'];

const getTabLabel = (tab) => {
  if (tab === 'summary') return 'Resumen';
  if (tab === 'strategy') return 'Inv. vs Pago';
  if (tab === 'table') return 'Amortización';
  return 'Gráficos';
};

const AppHeader = ({ activeTab, setActiveTab }) => (
  <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-black text-indigo-900 flex items-center gap-2">
        <Calculator className="text-indigo-600" />
        Simulador Maestro
      </h1>
      <p className="text-slate-500">Optimización de deuda y gestión patrimonial</p>
    </div>

    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {getTabLabel(tab)}
        </button>
      ))}
    </div>
  </header>
);

export default AppHeader;
