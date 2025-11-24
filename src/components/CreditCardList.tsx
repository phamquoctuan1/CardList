import { useState } from "react";
import { ChevronLeft, Plus, Wifi } from "lucide-react";

interface CreditCard {
  id: string;
  type: "mastercard" | "unionpay" | "visa" | "jcb";
  lastFourDigits: string;
  holderName: string;
  expiryDate: string;
  isDefault?: boolean;
}

const mockCards: CreditCard[] = [
  {
    id: "1",
    type: "mastercard",
    lastFourDigits: "4532",
    holderName: "John Doe",
    expiryDate: "12/25",
    isDefault: true,
  },
  {
    id: "2",
    type: "unionpay",
    lastFourDigits: "8976",
    holderName: "John Doe",
    expiryDate: "08/26",
  },
  {
    id: "3",
    type: "visa",
    lastFourDigits: "2341",
    holderName: "John Doe",
    expiryDate: "03/27",
  },
];

export function CreditCardList() {
  const [selectedCardId, setSelectedCardId] = useState<string>("1");
  const [cards] = useState<CreditCard[]>(mockCards);

  const handleContinue = () => {
    console.log("Selected card:", selectedCardId);
    // Handle continue action
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 relative">
        <div className="flex items-center justify-between mb-8">
          <button className="p-1 hover:bg-teal-700 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            <span className="text-sm">4G Service</span>
            <span className="text-sm ml-4">10:02</span>
          </div>
        </div>
        <h1 className="text-xl">Choose Card</h1>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-gray-700 mb-1">Choose Card to Pay</h2>
          <p className="text-gray-500 text-sm">Select your payment method</p>
        </div>

        {/* Card List */}
        <div className="space-y-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCardId(card.id)}
              className="border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md"
              style={{
                borderColor: selectedCardId === card.id ? "#0d9488" : "#e5e7eb",
                backgroundColor: selectedCardId === card.id ? "#f0fdfa" : "#ffffff",
              }}
            >
              <div className="flex items-center gap-4">
                {/* Radio Button */}
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: selectedCardId === card.id ? "#0d9488" : "#d1d5db",
                    }}
                  >
                    {selectedCardId === card.id && (
                      <div className="w-3 h-3 rounded-full bg-teal-600" />
                    )}
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="capitalize">{card.type}</span>
                    {card.isDefault && (
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    •••• •••• •••• {card.lastFourDigits}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {card.holderName} • Exp: {card.expiryDate}
                  </p>
                </div>

                {/* Card Logo */}
                <div className="flex-shrink-0">
                  <CardLogo type={card.type} />
                </div>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer transition-all hover:border-teal-600 hover:bg-teal-50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-teal-600">Add New Card</p>
                <p className="text-gray-500 text-sm">Link a new payment method</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-teal-600 text-white py-4 rounded-xl hover:bg-teal-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function CardLogo({ type }: { type: string }) {
  const logos = {
    mastercard: (
      <div className="flex items-center">
        <div className="w-8 h-8 bg-red-500 rounded-full opacity-80" />
        <div className="w-8 h-8 bg-orange-400 rounded-full -ml-4 opacity-80" />
      </div>
    ),
    unionpay: (
      <div className="bg-blue-600 text-white px-3 py-2 rounded text-xs">
        UnionPay
      </div>
    ),
    visa: (
      <div className="bg-blue-800 text-white px-3 py-2 rounded text-xs">
        VISA
      </div>
    ),
    jcb: (
      <div className="bg-blue-900 text-white px-3 py-2 rounded text-xs">
        JCB
      </div>
    ),
  };

  return logos[type as keyof typeof logos] || null;
}
