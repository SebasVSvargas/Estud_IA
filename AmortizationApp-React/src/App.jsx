import React, { useState } from 'react';
import AppHeader from './components/AppHeader';
import SidePanel from './components/panels/SidePanel';
import SummaryTab from './components/tabs/SummaryTab';
import StrategyTab from './components/tabs/StrategyTab';
import TableTab from './components/tabs/TableTab';
import ChartsTab from './components/tabs/ChartsTab';
import { formatCurrency } from './utils/formatters';
import { useLoanCalculations } from './hooks/useLoanCalculations';

const App = () => {
  const [loanAmount, setLoanAmount] = useState(50000000);
  const [interestRate, setInterestRate] = useState(15);
  const [termMonths, setTermMonths] = useState(60);
  const [method] = useState('french');
  const [userSalary] = useState(5000000);
  const [debtRatio] = useState(30);

  const [totalCapacity, setTotalCapacity] = useState(1500000);
  const [investmentROI, setInvestmentROI] = useState(10);

  const [useCustomInstallment, setUseCustomInstallment] = useState(false);
  const [customInstallmentValue, setCustomInstallmentValue] = useState(0);
  const [extraPayments, setExtraPayments] = useState([]);
  const [newExtraMonth, setNewExtraMonth] = useState(1);
  const [newExtraAmount, setNewExtraAmount] = useState(0);
  const [activeTab, setActiveTab] = useState('summary');

  const {
    baseline,
    strategyAnalysis,
    comparisonData,
    interestSaved,
    monthsSaved,
    firstInstallment,
    optSchedule,
    optInterest,
    optDuration,
  } = useLoanCalculations({
    loanAmount,
    interestRate,
    termMonths,
    method,
    extraPayments,
    useCustomInstallment,
    customInstallmentValue,
    totalCapacity,
    investmentROI,
    userSalary,
    debtRatio,
  });

  const addExtraPayment = () => {
    const month = parseInt(newExtraMonth, 10);
    const amount = parseFloat(newExtraAmount);

    if (Number.isNaN(month) || Number.isNaN(amount) || amount <= 0 || month <= 0) {
      return;
    }

    setExtraPayments((prev) => [
      ...prev,
      {
        id: `extra-${Date.now()}-${Math.random()}`,
        month,
        amount,
      },
    ]);

    setNewExtraAmount(0);
  };

  const removeExtraPayment = (id) => {
    setExtraPayments((prev) => prev.filter((payment) => payment.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className={`grid gap-8 ${activeTab === 'strategy' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
          {activeTab !== 'strategy' && (
            <SidePanel
              loanAmount={loanAmount}
              setLoanAmount={setLoanAmount}
              interestRate={interestRate}
              setInterestRate={setInterestRate}
              termMonths={termMonths}
              setTermMonths={setTermMonths}
              newExtraMonth={newExtraMonth}
              setNewExtraMonth={setNewExtraMonth}
              newExtraAmount={newExtraAmount}
              setNewExtraAmount={setNewExtraAmount}
              addExtraPayment={addExtraPayment}
              extraPayments={extraPayments}
              removeExtraPayment={removeExtraPayment}
              useCustomInstallment={useCustomInstallment}
              setUseCustomInstallment={setUseCustomInstallment}
              customInstallmentValue={customInstallmentValue}
              setCustomInstallmentValue={setCustomInstallmentValue}
              baselinePayment={baseline.monthlyPmt}
              formatCurrency={formatCurrency}
            />
          )}

          <main className={activeTab === 'strategy' ? 'col-span-full' : 'lg:col-span-8'}>
            {activeTab === 'summary' && (
              <SummaryTab
                baseline={baseline}
                firstInstallment={firstInstallment}
                optInterest={optInterest}
                optDuration={optDuration}
                interestSaved={interestSaved}
                monthsSaved={monthsSaved}
                comparisonData={comparisonData}
                formatCurrency={formatCurrency}
              />
            )}

            {activeTab === 'strategy' && (
              <StrategyTab
                totalCapacity={totalCapacity}
                setTotalCapacity={setTotalCapacity}
                investmentROI={investmentROI}
                setInvestmentROI={setInvestmentROI}
                strategyAnalysis={strategyAnalysis}
                formatCurrency={formatCurrency}
              />
            )}

            {activeTab === 'table' && <TableTab optSchedule={optSchedule} formatCurrency={formatCurrency} />}
            {activeTab === 'charts' && (
              <ChartsTab loanAmount={loanAmount} optInterest={optInterest} formatCurrency={formatCurrency} />
            )}
          </main>
        </div>

        <footer className="mt-12 text-center text-slate-400 text-xs pb-12 border-t pt-8">
          <p>© 2024 Simulador Maestro V5.3 - Análisis de Ingeniería Financiera</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
