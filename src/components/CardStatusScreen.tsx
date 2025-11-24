import { useState } from "react";
import { ChevronLeft, Home, Lock, Unlock, XCircle, AlertCircle } from "lucide-react";
import type { CreditCard } from "../App";

interface CardStatusScreenProps {
  card: CreditCard;
  onBack: () => void;
}

type CardStatus = "active" | "locked" | "blocked" | "lost";

export function CardStatusScreen({ card, onBack }: CardStatusScreenProps) {
  const [cardStatus, setCardStatus] = useState<CardStatus>(card.isActive ? "active" : "locked");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<CardStatus | null>(null);

  const handleStatusChange = (newStatus: CardStatus) => {
    setPendingStatus(newStatus);
    setShowConfirmation(true);
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      setCardStatus(pendingStatus);
      setShowConfirmation(false);
      setPendingStatus(null);
    }
  };

  const cancelStatusChange = () => {
    setShowConfirmation(false);
    setPendingStatus(null);
  };

  const statusInfo = {
    active: {
      label: "Active",
      color: "green",
      icon: <Unlock className="w-6 h-6" />,
      description: "Card is currently active and functional",
    },
    locked: {
      label: "Temporarily Locked",
      color: "orange",
      icon: <Lock className="w-6 h-6" />,
      description: "Card is temporarily locked, can be unlocked anytime",
    },
    blocked: {
      label: "Permanently Blocked",
      color: "red",
      icon: <XCircle className="w-6 h-6" />,
      description: "Card is permanently blocked, cannot be reactivated",
    },
    lost: {
      label: "Reported Lost",
      color: "red",
      icon: <AlertCircle className="w-6 h-6" />,
      description: "Card has been reported lost, need to request new card",
    },
  };

  const currentStatus = statusInfo[cardStatus];

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
          <h1 className="text-gray-900">Card Status Management</h1>
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
          <p className="text-gray-500 text-xs mt-1">Expires: {card.expiryDate}</p>
        </div>

        {/* Current Status */}
        <div className={`bg-${currentStatus.color}-50 border-2 border-${currentStatus.color}-200 rounded-xl p-4 mb-6`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`text-${currentStatus.color}-600`}>
              {currentStatus.icon}
            </div>
            <div className="flex-1">
              <h3 className={`text-${currentStatus.color}-900`}>
                Current Status: {currentStatus.label}
              </h3>
              <p className={`text-${currentStatus.color}-700 text-sm mt-1`}>
                {currentStatus.description}
              </p>
            </div>
          </div>
        </div>

        {/* Status Options */}
        <div className="space-y-3 mb-6">
          <h3 className="text-gray-900 mb-3">Change Card Status</h3>

          {/* Active */}
          {cardStatus !== "active" && cardStatus !== "blocked" && cardStatus !== "lost" && (
            <button
              onClick={() => handleStatusChange("active")}
              className="w-full border-2 border-green-600 bg-green-50 rounded-xl p-4 hover:bg-green-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Unlock className="w-5 h-5 text-green-600" />
                <div className="flex-1 text-left">
                  <p className="text-green-900">Unlock Card</p>
                  <p className="text-green-700 text-sm">Reactivate card for use</p>
                </div>
              </div>
            </button>
          )}

          {/* Lock */}
          {cardStatus === "active" && (
            <button
              onClick={() => handleStatusChange("locked")}
              className="w-full border-2 border-orange-400 bg-orange-50 rounded-xl p-4 hover:bg-orange-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-orange-600" />
                <div className="flex-1 text-left">
                  <p className="text-orange-900">Temporarily Lock Card</p>
                  <p className="text-orange-700 text-sm">Temporarily lock, can be unlocked later</p>
                </div>
              </div>
            </button>
          )}

          {/* Block Permanently */}
          {(cardStatus === "active" || cardStatus === "locked") && (
            <button
              onClick={() => handleStatusChange("blocked")}
              className="w-full border-2 border-red-400 bg-red-50 rounded-xl p-4 hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <div className="flex-1 text-left">
                  <p className="text-red-900">Block Permanently</p>
                  <p className="text-red-700 text-sm">Permanently block card, cannot be unlocked</p>
                </div>
              </div>
            </button>
          )}

          {/* Report Lost */}
          {(cardStatus === "active" || cardStatus === "locked") && (
            <button
              onClick={() => handleStatusChange("lost")}
              className="w-full border-2 border-red-600 bg-red-50 rounded-xl p-4 hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div className="flex-1 text-left">
                  <p className="text-red-900">Report Lost Card</p>
                  <p className="text-red-700 text-sm">Report lost and request new card</p>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Information */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex items-start gap-2">
            <span className="text-blue-600">ⓘ</span>
            <div className="flex-1">
              <p className="text-blue-900 mb-2">Important Notes:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Temporarily Lock: Can be unlocked anytime</li>
                <li>• Permanently Block: Cannot be reversed, need new card</li>
                <li>• Report Lost: Card will be blocked immediately</li>
                <li>• Contact hotline 1900 xxxx for support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && pendingStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg text-gray-900 mb-3">Confirm Change</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to {statusInfo[pendingStatus].label.toLowerCase()} this card?
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelStatusChange}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}