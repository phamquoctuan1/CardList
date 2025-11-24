import { useState } from "react";
import { ChevronLeft, ChevronDown, Home } from "lucide-react";
import type { CreditCard } from "../App";

interface PaymentScreenProps {
  card: CreditCard;
  onBack: () => void;
}

export function PaymentScreen({ card, onBack }: PaymentScreenProps) {
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(card.linkedAccount);

  const currentDebt = card.creditLimit && card.availableCredit 
    ? card.creditLimit - card.availableCredit 
    : 0;

  const minPayment = Math.round(currentDebt * 0.05);
  const statementBalance = currentDebt;

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
          <h1 className="text-gray-900">Statement Payment</h1>
          <Home className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {/* Source Account */}
        <div className="bg-green-600 text-white rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Source Account</span>
            <ChevronDown className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Balance</span>
            <span className="text-xl">{card.balance.toLocaleString('en-US')} LAK</span>
          </div>
        </div>

        <h2 className="text-gray-900 mb-4">Transaction Information</h2>

        {/* Service Type */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-2 block">Service Type</label>
          <div className="border rounded-xl p-3 flex items-center justify-between">
            <span className="text-gray-900">Payment for Cardholder</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Card Selection */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-2 block">Card Number</label>
          <div className="border rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-800 text-white px-2 py-1 rounded text-xs">VISA</div>
              <span className="text-gray-900">{card.cardNumber}</span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4 text-sm text-gray-700">
          Please make payment before 6:00 PM on 05/12/2025 to receive fee/interest benefits according to Phongsavanh regulations
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Statement Payment</span>
            <span className="text-gray-900">0 LAK</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Minimum Payment Required</span>
            <span className="text-gray-900">{minPayment.toLocaleString('en-US')} LAK</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Statement Balance Due</span>
            <span className="text-gray-900">{statementBalance.toLocaleString('en-US')} LAK</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Outstanding Balance</span>
            <span className="text-gray-900">{currentDebt.toLocaleString('en-US')} LAK</span>
          </div>
        </div>

        <button className="text-center w-full text-gray-600 py-2 mb-4">
          ⌄ View more
        </button>

        {/* Payment Amount Selection */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-600">Select Payment Amount</span>
            <span className="text-gray-400">ⓘ</span>
          </div>
          <div className="border rounded-xl p-3 flex items-center justify-between mb-3">
            <span className="text-gray-900">Minimum Amount</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          <label className="text-sm text-gray-600 mb-2 block">Amount</label>
          <div className="border rounded-xl p-3 flex items-center justify-between">
            <input
              type="text"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder={minPayment.toLocaleString('en-US')}
              className="flex-1 outline-none text-gray-900"
            />
            <span className="text-gray-600 ml-2">LAK</span>
          </div>
          <div className="w-full h-1 bg-green-600 rounded-full mt-2" />
        </div>

        {/* Note Section */}
        <div className="bg-yellow-50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600">ⓘ</span>
            <div className="flex-1">
              <p className="text-yellow-800 mb-2">Note:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Transaction processing time:</li>
                <li>• Transactions made before 6:00 PM will be updated in the system on the same day...</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors mb-4">
          Continue
        </button>
      </div>
    </div>
  );
}