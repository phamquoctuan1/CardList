import { useState } from "react";
import { ChevronLeft, ChevronDown, Home, Download } from "lucide-react";
import type { CreditCard } from "../App";

interface PaymentScreenProps {
  card: CreditCard;
  onBack: () => void;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
  status: "completed" | "pending";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "05/12/2025",
    description: "Payment at ABC Store",
    amount: 1250000,
    type: "debit",
    status: "completed",
  },
  {
    id: "2",
    date: "04/12/2025",
    description: "ATM Cash Withdrawal",
    amount: 2000000,
    type: "debit",
    status: "completed",
  },
  {
    id: "3",
    date: "03/12/2025",
    description: "Online Payment",
    amount: 850000,
    type: "debit",
    status: "completed",
  },
  {
    id: "4",
    date: "02/12/2025",
    description: "Transaction Refund",
    amount: 350000,
    type: "credit",
    status: "completed",
  },
  {
    id: "5",
    date: "01/12/2025",
    description: "Bill Payment",
    amount: 3200000,
    type: "debit",
    status: "pending",
  },
];

export function MiniStatementScreen({ card, onBack }: PaymentScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [transactions] = useState<Transaction[]>(mockTransactions);

  const totalDebit = transactions
    .filter(t => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCredit = transactions
    .filter(t => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>⚫⚫⚫</span>
            <span>4G</span>
            <span className="bg-yellow-400 text-black px-2 rounded">69</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-gray-900">Card Statement</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <Home className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {/* Card Info */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-blue-800 px-2 py-1 rounded text-xs">VISA</div>
              <span className="text-sm">{card.cardNumber}</span>
            </div>
            <ChevronDown className="w-5 h-5" />
          </div>
          <div className="text-sm opacity-90 mb-1">Current Statement Period</div>
          <div className="text-sm">06/11/2025 - 05/12/2025</div>
        </div>

        {/* Period Selection */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-2 block">Select Statement Period</label>
          <div className="border rounded-xl p-3 flex items-center justify-between">
            <span className="text-gray-900">Current Statement Period</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Spending</span>
            <span className="text-red-600">{totalDebit.toLocaleString('en-US')} LAK</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Refunds</span>
            <span className="text-green-600">+{totalCredit.toLocaleString('en-US')} LAK</span>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-between">
            <span className="text-gray-900">Balance Due</span>
            <span className="text-gray-900">{(totalDebit - totalCredit).toLocaleString('en-US')} LAK</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Minimum Payment Due Date</span>
            <span className="text-gray-900">05/12/2025</span>
          </div>
        </div>

        {/* Transactions */}
        <div className="mb-4">
          <h3 className="text-gray-900 mb-3">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="border-b pb-3">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm mb-1">{transaction.description}</p>
                    <p className="text-gray-500 text-xs">{transaction.date}</p>
                    {transaction.status === "pending" && (
                      <span className="inline-block mt-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`${transaction.type === "debit" ? "text-red-600" : "text-green-600"}`}>
                      {transaction.type === "debit" ? "-" : "+"}
                      {transaction.amount.toLocaleString('en-US')} LAK
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More */}
        <button className="text-center w-full text-gray-600 py-2 mb-4">
          View all transactions
        </button>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors">
            Pay Now
          </button>
          <button className="w-full border-2 border-green-600 text-green-600 py-4 rounded-xl hover:bg-green-50 transition-colors">
            Download PDF Statement
          </button>
        </div>
      </div>
    </div>
  );
}