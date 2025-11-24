import { useState } from "react";
import { ChevronLeft, Home, Eye, EyeOff } from "lucide-react";
import type { CreditCard } from "../App";

interface ChangePinScreenProps {
  card: CreditCard;
  onBack: () => void;
}

export function ChangePinScreen({ card, onBack }: ChangePinScreenProps) {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (currentPin.length !== 6) {
      setError("Current PIN must be 6 digits");
      return;
    }

    if (newPin.length !== 6) {
      setError("New PIN must be 6 digits");
      return;
    }

    if (newPin !== confirmPin) {
      setError("New PIN and Confirm PIN do not match");
      return;
    }

    if (currentPin === newPin) {
      setError("New PIN must be different from current PIN");
      return;
    }

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
          <h1 className="text-gray-900">Change PIN</h1>
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

        <h2 className="text-gray-900 mb-4">Change Your PIN</h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4 rounded">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Current PIN */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-2 block">Current PIN</label>
          <div className="border rounded-xl p-3 flex items-center justify-between">
            <input
              type={showCurrentPin ? "text" : "password"}
              value={currentPin}
              onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="flex-1 outline-none text-gray-900"
              placeholder="Enter current PIN"
              maxLength={6}
            />
            <button
              onClick={() => setShowCurrentPin(!showCurrentPin)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">6 digits</p>
        </div>

        {/* New PIN */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-2 block">New PIN</label>
          <div className="border rounded-xl p-3 flex items-center justify-between">
            <input
              type={showNewPin ? "text" : "password"}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="flex-1 outline-none text-gray-900"
              placeholder="Enter new PIN"
              maxLength={6}
            />
            <button
              onClick={() => setShowNewPin(!showNewPin)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              {showNewPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">6 digits</p>
        </div>

        {/* Confirm PIN */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">Confirm New PIN</label>
          <div className="border rounded-xl p-3 flex items-center justify-between">
            <input
              type={showConfirmPin ? "text" : "password"}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="flex-1 outline-none text-gray-900"
              placeholder="Confirm new PIN"
              maxLength={6}
            />
            <button
              onClick={() => setShowConfirmPin(!showConfirmPin)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">6 digits</p>
        </div>

        {/* PIN Requirements */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
          <div className="flex items-start gap-2">
            <span className="text-blue-600">ⓘ</span>
            <div className="flex-1">
              <p className="text-blue-900 mb-2">PIN Requirements:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Must be exactly 6 digits</li>
                <li>• Cannot be the same as current PIN</li>
                <li>• Avoid using simple sequences (123456, 111111)</li>
                <li>• Do not share your PIN with anyone</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors"
        >
          Change PIN
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
            <h3 className="text-lg text-gray-900 mb-2">PIN Changed!</h3>
            <p className="text-gray-600">Your PIN has been changed successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}
