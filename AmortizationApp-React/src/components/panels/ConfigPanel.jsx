import React from 'react';
import { DollarSign } from 'lucide-react';

const ConfigPanel = ({ loanAmount, setLoanAmount, interestRate, setInterestRate, termMonths, setTermMonths }) => (
  <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-slate-400">
      <DollarSign className="w-4 h-4" /> Configuración Inicial
    </h3>

    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-500 mb-1">Monto del Préstamo</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(event) => setLoanAmount(Number(event.target.value))}
          className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">Interés (% Anual)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(event) => setInterestRate(Number(event.target.value))}
            className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">Plazo (Meses)</label>
          <input
            type="number"
            value={termMonths}
            onChange={(event) => setTermMonths(Number(event.target.value))}
            className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none"
          />
        </div>
      </div>
    </div>
  </section>
);

export default ConfigPanel;
