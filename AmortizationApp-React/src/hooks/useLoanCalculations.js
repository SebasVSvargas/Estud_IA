import { useMemo } from 'react';

export const useLoanCalculations = ({
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
}) => {
  const baseline = useMemo(() => {
    let balance = loanAmount;
    const monthlyRate = (interestRate / 100) / 12;
    let totalInterest = 0;
    const schedule = [];

    const pmt = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));

    for (let month = 1; month <= termMonths; month += 1) {
      const interest = balance * monthlyRate;
      const capital = pmt - interest;
      balance -= capital;
      totalInterest += interest;
      schedule.push({ month, balance: Math.max(0, balance), interest, capital });
    }

    return {
      totalInterest,
      totalCost: loanAmount + totalInterest,
      duration: termMonths,
      monthlyPmt: pmt,
      schedule,
    };
  }, [loanAmount, interestRate, termMonths]);

  const amortization = useMemo(() => {
    const schedule = [];
    let balance = loanAmount;
    const monthlyRate = (interestRate / 100) / 12;
    let totalInterest = 0;
    const activeExtras = [...extraPayments].sort((a, b) => a.month - b.month);

    let pmt;
    if (method === 'french') {
      pmt = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
    } else if (method === 'german') {
      pmt = (loanAmount / termMonths) + (balance * monthlyRate);
    } else {
      pmt = balance * monthlyRate;
    }

    let effectivePmt = pmt;
    if (useCustomInstallment && customInstallmentValue > pmt) {
      effectivePmt = customInstallmentValue;
    }

    for (let month = 1; month <= 480 && balance > 0.01; month += 1) {
      const interest = balance * monthlyRate;
      let currentPmt =
        method === 'german' && !useCustomInstallment
          ? (loanAmount / termMonths) + interest
          : effectivePmt;

      if (method === 'american' && month === termMonths && !useCustomInstallment) {
        currentPmt = balance + interest;
      }

      currentPmt = Math.max(currentPmt, interest + 1);
      const capital = Math.min(balance, currentPmt - interest);

      const extra = activeExtras.find((item) => item.month === month);
      const extraValue = extra ? Math.min(extra.amount, balance - capital) : 0;

      balance -= capital + extraValue;
      totalInterest += interest;

      schedule.push({
        month,
        payment: currentPmt + extraValue,
        principal: capital,
        interest,
        extra: extraValue,
        balance: Math.max(0, balance),
      });
    }

    return {
      schedule,
      totalInterest,
      totalCost: loanAmount + totalInterest,
      duration: schedule.length,
    };
  }, [
    loanAmount,
    interestRate,
    termMonths,
    extraPayments,
    useCustomInstallment,
    customInstallmentValue,
    method,
  ]);

  const strategyAnalysis = useMemo(() => {
    const monthlyDebtRate = (interestRate / 100) / 12;
    const monthlyInvRate = (investmentROI / 100) / 12;
    const bankPmt = baseline.monthlyPmt;
    const surplus = Math.max(0, totalCapacity - bankPmt);

    const scenarioData = [];
    let balanceA = loanAmount;
    let investmentA = 0;
    let totalIntA = 0;
    let balanceB = loanAmount;
    let investmentB = 0;
    let totalIntB = 0;
    let debtFreeMonth = termMonths;

    for (let month = 1; month <= termMonths; month += 1) {
      const intA = balanceA * monthlyDebtRate;
      const capA = Math.min(balanceA, bankPmt - intA);
      balanceA -= capA;
      totalIntA += intA;
      investmentA = (investmentA + surplus) * (1 + monthlyInvRate);

      if (balanceB > 0.01) {
        const intB = balanceB * monthlyDebtRate;
        const capB = Math.min(balanceB, totalCapacity - intB);
        balanceB -= capB;
        totalIntB += intB;
        if (balanceB <= 0.01) {
          debtFreeMonth = month;
        }
      } else {
        investmentB = (investmentB + totalCapacity) * (1 + monthlyInvRate);
      }

      scenarioData.push({ month, patrimonioA: investmentA, patrimonioB: investmentB });
    }

    return {
      scenarioData,
      totalIntA,
      totalIntB,
      debtFreeMonth,
      finalWealthA: investmentA,
      finalWealthB: investmentB,
      ahorroIntB: totalIntA - totalIntB,
    };
  }, [loanAmount, interestRate, termMonths, totalCapacity, investmentROI, baseline.monthlyPmt]);

  const { schedule: optSchedule, totalInterest: optInterest, totalCost: optCost, duration: optDuration } = amortization;

  const comparisonData = useMemo(() => {
    const combined = [];
    const maxMonths = Math.max(baseline.duration, optDuration);

    for (let month = 1; month <= maxMonths; month += 1) {
      combined.push({
        month,
        balanceOriginal: baseline.schedule.find((item) => item.month === month)?.balance ?? 0,
        balanceOptimized: optSchedule.find((item) => item.month === month)?.balance ?? 0,
      });
    }

    return combined;
  }, [baseline, optSchedule, optDuration]);

  const interestSaved = baseline.totalInterest - optInterest;
  const monthsSaved = baseline.duration - optDuration;
  const firstInstallment = optSchedule[0]?.payment || 0;
  const maxAllowedInstallment = userSalary * (debtRatio / 100);
  const isAffordable = firstInstallment <= maxAllowedInstallment;

  return {
    baseline,
    amortization,
    strategyAnalysis,
    comparisonData,
    interestSaved,
    monthsSaved,
    firstInstallment,
    maxAllowedInstallment,
    isAffordable,
    optSchedule,
    optInterest,
    optCost,
    optDuration,
  };
};
