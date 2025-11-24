import { useState } from "react";
import { ChevronLeft, Home } from "lucide-react";
import type { CreditCard } from "../App";

interface UpdateCardInfoScreenProps {
  card: CreditCard;
  onBack: () => void;
}

export function UpdateCardInfoScreen({ card, onBack }: UpdateCardInfoScreenProps) {
  const [email, setEmail] = useState("phamquoctuan@email.com");
  const [phone, setPhone] = useState("+856 20 12345678");
  const [address, setAddress] = useState("123 Main Street, Vientiane");
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
          <h1 className="text-gray-900">Update Card Information</h1>
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

        <h2 className="text-gray-900 mb-4">Contact Information</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-2 block">Email Address</label>
          <div className="border rounded-xl p-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-gray-900"
              placeholder="email@example.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-2 block">Phone Number</label>
          <div className="border rounded-xl p-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full outline-none text-gray-900"
              placeholder="+856 20 XXXXXXXX"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-2 block">Mailing Address</label>
          <div className="border rounded-xl p-3">
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full outline-none text-gray-900 min-h-[80px]"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Statement Delivery Preference */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 block">Statement Delivery</label>
          <div className="space-y-3">
            <div className="border rounded-xl p-3 cursor-pointer hover:border-green-600">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="delivery" defaultChecked className="w-4 h-4" />
                <div>
                  <p className="text-gray-900">Email Statement</p>
                  <p className="text-gray-500 text-sm">Receive statements via email</p>
                </div>
              </label>
            </div>
            <div className="border rounded-xl p-3 cursor-pointer hover:border-green-600">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="delivery" className="w-4 h-4" />
                <div>
                  <p className="text-gray-900">Paper Statement</p>
                  <p className="text-gray-500 text-sm">Receive physical statements by mail</p>
                </div>
              </label>
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
                Changes to your contact information will be effective within 24 hours. 
                Please ensure all information is accurate.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors"
        >
          Update Information
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
            <h3 className="text-lg text-gray-900 mb-2">Success!</h3>
            <p className="text-gray-600">Your information has been updated successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}
