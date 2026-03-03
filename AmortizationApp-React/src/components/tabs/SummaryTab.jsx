import React from 'react';
import { TrendingDown, ArrowLeftRight, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SummaryTab = ({ baseline, firstInstallment, optInterest, optDuration, interestSaved, monthsSaved, comparisonData, formatCurrency }) => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Escenario Banco (Referencia)</p>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-tight">Cuota Mínima</span>
            <span className="text-sm font-black text-slate-800">{formatCurrency(baseline.monthlyPmt)}</span>
          </div>
          <div className="flex justify-between items-center px-3">
            <span className="text-xs text-slate-500">Intereses Totales</span>
            <span className="text-sm font-bold text-slate-600">{formatCurrency(baseline.totalInterest)}</span>
          </div>
          <div className="flex justify-between items-center px-3">
            <span className="text-xs text-slate-500">Plazo Original</span>
            <span className="text-sm font-bold text-slate-600">{baseline.duration} Meses</span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <Zap className="absolute top-0 right-0 p-4 w-12 h-12 text-indigo-500/30" />
        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-4">Escenario Optimizado (Tu Plan)</p>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-indigo-800/50 rounded-xl border border-indigo-700">
            <span className="text-xs text-indigo-200 font-bold uppercase tracking-tight">Tu Cuota Actual</span>
            <span className="text-sm font-black text-white">{formatCurrency(firstInstallment)}</span>
          </div>
          <div className="flex justify-between items-center px-3">
            <span className="text-xs text-indigo-200">Intereses a Pagar</span>
            <span className="text-sm font-bold text-white">{formatCurrency(optInterest)}</span>
          </div>
          <div className="flex justify-between items-center px-3">
            <span className="text-xs text-indigo-200">Plazo Real</span>
            <span className="text-sm font-bold text-white">{optDuration} Meses</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mt-16" />
      <div className="flex items-center gap-4 relative z-10">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <TrendingDown className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase text-emerald-100 tracking-wider">Ahorro en Intereses</h4>
          <p className="text-4xl font-black">{formatCurrency(interestSaved)}</p>
        </div>
      </div>
      <div className="text-center md:text-right relative z-10">
        <p className="text-xs font-black uppercase text-emerald-100 tracking-wider">Libertad Anticipada</p>
        <p className="text-2xl font-black">Terminas {monthsSaved} meses antes</p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <ArrowLeftRight className="w-5 h-5 text-indigo-600" /> Comparativa de Liquidación de Deuda
      </h3>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis fontSize={10} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000000}M`} />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="balanceOriginal" stroke="#94a3b8" fill="#f1f5f9" name="Banco" strokeWidth={2} />
            <Area type="monotone" dataKey="balanceOptimized" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={3} name="Optimizado" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default SummaryTab;
