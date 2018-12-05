export interface GeneralBudget {
  bankAmount: number;
  lastUpdatedBankAmount: string;
}

export interface CreditCardDebt {
  amount: number;
  lastUpdated: string;
}

export interface MonthlyExpense {
  title: string;
  cost: number;
}

export interface PiggyBank {
  title: string;
  currentTotal: number;
  goalTotal?: number;
  amountPerMonth: number;
  lastUpdated: Date;
}

export interface Income {
  id: string;
  amount: number;
  dayReceived: number;
}
