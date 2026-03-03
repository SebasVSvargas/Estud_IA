import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartsTab = ({ loanAmount, optInterest, formatCurrency }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95">
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-sm font-black text-slate-400 uppercase mb-6">Costo Total del Crédito</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: 'Capital', value: loanAmount },
                { name: 'Intereses', value: optInterest },
              ]}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              <Cell fill="#4f46e5" />
              <Cell fill="#f43f5e" />
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default ChartsTab;
