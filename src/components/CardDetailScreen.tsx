/// <reference path="../vite-env.d.ts" />
import { useState } from "react";
import { ChevronLeft, ChevronDown, Home } from "lucide-react";
import type { CreditCard, Screen } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import mastercardDebit from "../assets/mastercard_debit.png";
import visaDebit from "../assets/visa_debit.png";

interface CardDetailScreenProps {
  card: CreditCard;
  onBack: () => void;
  onNavigate: (screen: Screen, card?: CreditCard) => void;
}

export function CardDetailScreen({ card, onBack, onNavigate }: CardDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<"info" | "service" | "report">("info");
  const [showAccountNumber, setShowAccountNumber] = useState(false);

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
          <h1 className="text-gray-900">Card Services</h1>
          <Home className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-4 pt-4 border-b">
        <button
          onClick={() => setActiveTab("info")}
          className={`pb-2 text-sm relative ${activeTab === "info" ? "text-green-600" : "text-gray-500"
            }`}
        >
          Information
          {activeTab === "info" && card.category === "credit" && (
            <span className="ml-1 bg-green-500 text-white text-xs px-1.5 rounded-full">1</span>
          )}
          {activeTab === "info" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("service")}
          className={`pb-2 text-sm relative ${activeTab === "service" ? "text-green-600" : "text-gray-500"
            }`}
        >
          Services
          {activeTab === "service" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("report")}
          className={`pb-2 text-sm relative ${activeTab === "report" ? "text-green-600" : "text-gray-500"
            }`}
        >
          Statement
          {activeTab === "report" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {activeTab === "info" && (
          <>
            {/* Card Display */}
            <div className="mb-6">
              <ImageWithFallback
                src={
                  card.category === 'credit'
                    ? visaDebit // Premium/Gold
                    : card.type === 'mastercard'
                      ? mastercardDebit // User provided Mastercard
                      : visaDebit // User provided Visa
                }
                alt="Credit Card"
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <p className="text-center text-gray-700">
                Phongsavanh {card.type.charAt(0).toUpperCase() + card.type.slice(1)} {card.category === 'credit' ? 'Credit' : 'debit'}
              </p>
            </div>

            {/* Card Number Selector */}
            <div className="bg-white border rounded-xl p-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-800 text-white px-2 py-1 rounded text-xs">VISA</div>
                <span className="text-gray-900">{card.cardNumber}</span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-sm text-green-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                Primary Card
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                • Active
              </div>
              <button
                onClick={() => onNavigate("status", card)}
                className="text-sm text-gray-600 hover:text-green-600"
              >
                ⚙️
              </button>
            </div>

            {/* Card Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>Cardholder Name</span>
                  <span className="text-gray-400">ⓘ</span>
                </div>
                <span className="text-gray-900">PHAM QUOC TUAN</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-gray-600">Linked Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">
                    {showAccountNumber ? card.linkedAccount : "••••••" + card.linkedAccount?.slice(-4)}
                  </span>
                  <button
                    onClick={() => setShowAccountNumber(!showAccountNumber)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showAccountNumber ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Credit Limits */}
              {card.category === "credit" && (
                <>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Available Credit Limit ⓘ</span>
                      <span className="text-gray-900">{card.availableCredit?.toLocaleString('en-US')} LAK</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Outstanding Balance</span>
                      <span className="text-gray-900">Remaining Credit Limit</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{(card.creditLimit! - card.availableCredit!).toLocaleString('en-US')} LAK</span>
                      <span className="text-gray-900">{card.availableCredit?.toLocaleString('en-US')} LAK</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Amount Due</span>
                      <span className="text-gray-900">{(card.creditLimit! - card.availableCredit!).toLocaleString('en-US')} LAK</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate("payment", card)}
                    className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors mt-4"
                  >
                    Pay Statement
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {activeTab === "service" && (
          <div className="space-y-4">
            <h2 className="text-gray-900 mb-4">Card Services</h2>

            {/* Update Plastic Status */}
            <div
              onClick={() => onNavigate("status", card)}
              className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-green-600 hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900">Update Plastic Status</p>
                    <p className="text-gray-500 text-sm">Lock, unlock or report lost card</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400 transform -rotate-90" />
              </div>
            </div>

            {/* Update Card Information */}
            <div
              onClick={() => onNavigate("updateInfo", card)}
              className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-green-600 hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900">Update Card Information</p>
                    <p className="text-gray-500 text-sm">Update contact details and preferences</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400 transform -rotate-90" />
              </div>
            </div>

            {/* Change PIN */}
            <div
              onClick={() => onNavigate("changePin", card)}
              className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-green-600 hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900">Change PIN</p>
                    <p className="text-gray-500 text-sm">Change your card PIN number</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400 transform -rotate-90" />
              </div>
            </div>

            {/* Card Limits */}
            <div
              onClick={() => onNavigate("limits", card)}
              className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-green-600 hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900">Set Transaction Limits</p>
                    <p className="text-gray-500 text-sm">Set daily and monthly limits</p>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400 transform -rotate-90" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "report" && (
          <div className="space-y-4">
            <h2 className="text-gray-900 mb-4">Statement Period</h2>

            {/* Date Range Selection */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">From Date</label>
              <div className="border rounded-xl p-3 flex items-center justify-between">
                <input
                  type="date"
                  defaultValue="2025-11-06"
                  className="flex-1 outline-none text-gray-900"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">To Date</label>
              <div className="border rounded-xl p-3 flex items-center justify-between">
                <input
                  type="date"
                  defaultValue="2025-12-05"
                  className="flex-1 outline-none text-gray-900"
                />
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors mb-4">
              Search Statement
            </button>

            {/* Statement Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Statement Period</span>
                <span className="text-gray-900">06/11/2025 - 05/12/2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Outstanding</span>
                <span className="text-gray-900">{card.category === "credit" && card.creditLimit && card.availableCredit ? (card.creditLimit - card.availableCredit).toLocaleString('en-US') : "0"} LAK</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Minimum Payment</span>
                <span className="text-gray-900">{card.category === "credit" && card.creditLimit && card.availableCredit ? Math.round((card.creditLimit - card.availableCredit) * 0.05).toLocaleString('en-US') : "0"} LAK</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Date</span>
                <span className="text-gray-900">05/12/2025</span>
              </div>
            </div>

            <button className="w-full border-2 border-green-600 text-green-600 py-4 rounded-xl hover:bg-green-50 transition-colors">
              View Full Statement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}