import { useState } from "react";
import { ChevronLeft, Home } from "lucide-react";
import type { CreditCard } from "../App";

interface TransactionLimitScreenProps {
  card: CreditCard;
  onBack: () => void;
}

export function TransactionLimitScreen({ card, onBack }: TransactionLimitScreenProps) {
  const [dailyAtmLimit, setDailyAtmLimit] = useState("5000000");
  const [dailyPosLimit, setDailyPosLimit] = useState("20000000");
  const [dailyOnlineLimit, setDailyOnlineLimit] = useState("10000000");
  const [monthlyLimit, setMonthlyLimit] = useState("50000000");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 2000);
  };

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
          <h1 className="text-gray-900">Transaction Limits</h1>
          <Home className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {/* Card Info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-800 text-white px-2 py-1 rounded text-xs">VISA</div>
            <span className="text-gray-900">{card.cardNumber}</span>
          </div>
          <p className="text-gray-600 text-sm">{card.holderName}</p>
        </div>

        <h2 className="text-gray-900 mb-4">Daily Transaction Limits</h2>

        {/* ATM Withdrawal Limit */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">ATM Withdrawal Limit</label>
          <div className="border rounded-xl p-3 flex items-center justify-between mb-2">
            <input
              type="text"
              value={dailyAtmLimit}
              onChange={(e) => setDailyAtmLimit(e.target.value.replace(/\D/g, ''))}
              className="flex-1 outline-none text-gray-900"
              placeholder="0"
            />
            <span className="text-gray-600 ml-2">LAK</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Min: 100,000 LAK</span>
            <span>Max: 10,000,000 LAK</span>
          </div>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={dailyAtmLimit}
            onChange={(e) => setDailyAtmLimit(e.target.value)}
            className="w-full mt-2"
          />
        </div>

        {/* POS Purchase Limit */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">POS Purchase Limit</label>
          <div className="border rounded-xl p-3 flex items-center justify-between mb-2">
            <input
              type="text"
              value={dailyPosLimit}
              onChange={(e) => setDailyPosLimit(e.target.value.replace(/\D/g, ''))}
              className="flex-1 outline-none text-gray-900"
              placeholder="0"
            />
            <span className="text-gray-600 ml-2">LAK</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Min: 100,000 LAK</span>
            <span>Max: 50,000,000 LAK</span>
          </div>
          <input
            type="range"
            min="100000"
            max="50000000"
            step="100000"
            value={dailyPosLimit}
            onChange={(e) => setDailyPosLimit(e.target.value)}
            className="w-full mt-2"
          />
        </div>

        {/* Online Transaction Limit */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">Online Transaction Limit</label>
          <div className="border rounded-xl p-3 flex items-center justify-between mb-2">
            <input
              type="text"
              value={dailyOnlineLimit}
              onChange={(e) => setDailyOnlineLimit(e.target.value.replace(/\D/g, ''))}
              className="flex-1 outline-none text-gray-900"
              placeholder="0"
            />
            <span className="text-gray-600 ml-2">LAK</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Min: 100,000 LAK</span>
            <span>Max: 30,000,000 LAK</span>
          </div>
          <input
            type="range"
            min="100000"
            max="30000000"
            step="100000"
            value={dailyOnlineLimit}
            onChange={(e) => setDailyOnlineLimit(e.target.value)}
            className="w-full mt-2"
          />
        </div>

        <h2 className="text-gray-900 mb-4">Monthly Transaction Limit</h2>

        {/* Monthly Limit */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">Total Monthly Limit</label>
          <div className="border rounded-xl p-3 flex items-center justify-between mb-2">
            <input
              type="text"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value.replace(/\D/g, ''))}
              className="flex-1 outline-none text-gray-900"
              placeholder="0"
            />
            <span className="text-gray-600 ml-2">LAK</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Min: 1,000,000 LAK</span>
            <span>Max: 100,000,000 LAK</span>
          </div>
          <input
            type="range"
            min="1000000"
            max="100000000"
            step="1000000"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
            className="w-full mt-2"
          />
        </div>

        {/* Current Usage */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="text-gray-900 mb-3">Current Usage (This Month)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">ATM Withdrawals</span>
              <span className="text-gray-900">2,500,000 LAK</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">POS Purchases</span>
              <span className="text-gray-900">8,750,000 LAK</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Online Transactions</span>
              <span className="text-gray-900">3,200,000 LAK</span>
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Total Used</span>
              <span className="text-gray-900">14,450,000 LAK</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Remaining Limit</span>
              <span className="text-green-600">{(parseInt(monthlyLimit) - 14450000).toLocaleString('en-US')} LAK</span>
            </div>
          </div>
        </div>

        {/* Information Note */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
          <div className="flex items-start gap-2">
            <span className="text-blue-600">ⓘ</span>
            <div className="flex-1">
              <p className="text-blue-900 mb-1">Important:</p>
              <p className="text-sm text-blue-800">
                Changes to transaction limits will take effect immediately. 
                You can modify these limits at any time through this screen.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors"
        >
          Save Limits
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Limits Updated!</h3>
            <p className="text-gray-600">Your transaction limits have been updated successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}
