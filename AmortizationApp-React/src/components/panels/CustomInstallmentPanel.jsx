import React from 'react';
import { Zap } from 'lucide-react';

const CustomInstallmentPanel = ({
  useCustomInstallment,
  setUseCustomInstallment,
  customInstallmentValue,
  setCustomInstallmentValue,
  baselinePayment,
  formatCurrency,
}) => (
  <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-amber-500">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
        <Zap className="w-4 h-4 fill-amber-500" /> Cuota Superior
      </h3>
      <input
        type="checkbox"
        checked={useCustomInstallment}
        onChange={() => setUseCustomInstallment(!useCustomInstallment)}
        className="w-4 h-4 accent-amber-500"
      />
    </div>

    {useCustomInstallment && (
      <div className="animate-in slide-in-from-top-2 duration-300">
        <input
          type="number"
          value={customInstallmentValue}
          onChange={(event) => setCustomInstallmentValue(Number(event.target.value))}
          className="w-full p-2.5 bg-amber-50 border border-amber-200 rounded-lg outline-none font-bold text-amber-900"
          placeholder="Ej: 800.000"
        />
        <p className="text-[10px] text-amber-600 mt-1">Mínimo sugerido: {formatCurrency(baselinePayment)}</p>
      </div>
    )}
  </section>
);

export default CustomInstallmentPanel;
