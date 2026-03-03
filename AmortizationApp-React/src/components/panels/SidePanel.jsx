import React from 'react';
import ConfigPanel from './ConfigPanel';
import ExtraPaymentsPanel from './ExtraPaymentsPanel';
import CustomInstallmentPanel from './CustomInstallmentPanel';

const SidePanel = (props) => (
  <aside className="lg:col-span-4 space-y-6 animate-in slide-in-from-left duration-500">
    <ConfigPanel
      loanAmount={props.loanAmount}
      setLoanAmount={props.setLoanAmount}
      interestRate={props.interestRate}
      setInterestRate={props.setInterestRate}
      termMonths={props.termMonths}
      setTermMonths={props.setTermMonths}
    />

    <ExtraPaymentsPanel
      newExtraMonth={props.newExtraMonth}
      setNewExtraMonth={props.setNewExtraMonth}
      newExtraAmount={props.newExtraAmount}
      setNewExtraAmount={props.setNewExtraAmount}
      addExtraPayment={props.addExtraPayment}
      extraPayments={props.extraPayments}
      removeExtraPayment={props.removeExtraPayment}
      formatCurrency={props.formatCurrency}
    />

    <CustomInstallmentPanel
      useCustomInstallment={props.useCustomInstallment}
      setUseCustomInstallment={props.setUseCustomInstallment}
      customInstallmentValue={props.customInstallmentValue}
      setCustomInstallmentValue={props.setCustomInstallmentValue}
      baselinePayment={props.baselinePayment}
      formatCurrency={props.formatCurrency}
    />
  </aside>
);

export default SidePanel;
