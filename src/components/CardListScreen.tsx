/// <reference path="../vite-env.d.ts" />
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Wifi } from "lucide-react";
import type { CreditCard, Screen } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import mastercardDebit from "../assets/mastercard_debit.png";
import visaDebit from "../assets/visa_debit.png";

interface CardListScreenProps {
  onNavigate: (screen: Screen, card?: CreditCard) => void;
}

const mockCards: CreditCard[] = [
  {
    id: "1",
    type: "visa",
    cardNumber: "4532 **** **** 1234",
    lastFourDigits: "1234",
    holderName: "PHAM QUOC TUAN",
    expiryDate: "04/2028",
    category: "credit",
    isActive: true,
    linkedAccount: "1234567890",
    balance: 15000000,
    creditLimit: 50000000,
    availableCredit: 35000000,
  },
  {
    id: "2",
    type: "mastercard",
    cardNumber: "5412 **** **** 5678",
    lastFourDigits: "5678",
    holderName: "PHAM QUOC TUAN",
    expiryDate: "-/-",
    category: "debit",
    isActive: true,
    linkedAccount: "0987654321",
    balance: 8500000,
  },
  {
    id: "3",
    type: "visa",
    cardNumber: "4916 **** **** 9012",
    lastFourDigits: "9012",
    holderName: "PHAM QUOC TUAN",
    expiryDate: "11/2028",
    category: "debit",
    isActive: true,
    linkedAccount: "1122334455",
    balance: 12000000,
  },
];

export function CardListScreen({ onNavigate }: CardListScreenProps) {
  const [cards] = useState<CreditCard[]>(mockCards);

  const creditCards = cards.filter(c => c.category === "credit");
  const debitCards = cards.filter(c => c.category === "debit");

  return (
    <div className="w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>⚫⚫⚫</span>
            <span>4G</span>
            <span className="bg-yellow-400 text-black px-2 rounded">69</span>
          </div>
        </div>
        <h1 className="text-gray-900 mb-4">Card List</h1>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {/* Credit Cards */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-900">Credit Cards</h2>
            <button className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {creditCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onNavigate("detail", card)}
              className="bg-yellow-50 rounded-2xl p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardLogo type={card.type} />
                    <span className="text-gray-900">{card.cardNumber}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Expiry Date: {card.expiryDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ImageWithFallback
                    src={
                      card.category === 'credit'
                        ? visaDebit // Premium/Gold
                        : card.type === 'mastercard'
                          ? mastercardDebit // User provided Mastercard
                          : visaDebit // User provided Visa
                    }
                    alt="Credit Card"
                    className="w-16 h-12 object-cover rounded"
                  />
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Debit Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-900">Debit Cards</h2>
            <button className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {debitCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onNavigate("detail", card)}
              className="bg-yellow-50 rounded-2xl p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardLogo type={card.type} />
                    <span className="text-gray-900">{card.cardNumber}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Expiry Date: {card.expiryDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ImageWithFallback
                    src={
                      card.category === 'credit'
                        ? "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=400&h=250&fit=crop" // Premium/Gold
                        : card.type === 'mastercard'
                          ? mastercardDebit // User provided Mastercard
                          : visaDebit // User provided Visa
                    }
                    alt="Debit Card"
                    className="w-16 h-12 object-cover rounded"
                  />
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardLogo({ type }: { type: string }) {
  if (type === "visa") {
    return (
      <div className="bg-blue-800 text-white px-2 py-1 rounded text-xs">
        VISA
      </div>
    );
  }
  if (type === "mastercard") {
    return (
      <div className="flex items-center">
        <div className="w-5 h-5 bg-red-500 rounded-full opacity-80" />
        <div className="w-5 h-5 bg-orange-400 rounded-full -ml-2 opacity-80" />
      </div>
    );
  }
  return null;
}