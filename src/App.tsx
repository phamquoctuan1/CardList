import { useState } from "react";
import { CardListScreen } from "./components/CardListScreen";
import { CardDetailScreen } from "./components/CardDetailScreen";
import { PaymentScreen } from "./components/PaymentScreen";
import { MiniStatementScreen } from "./components/MiniStatementScreen";
import { CardStatusScreen } from "./components/CardStatusScreen";
import { UpdateCardInfoScreen } from "./components/UpdateCardInfoScreen";
import { ChangePinScreen } from "./components/ChangePinScreen";
import { TransactionLimitScreen } from "./components/TransactionLimitScreen";

export type Screen = "list" | "detail" | "payment" | "statement" | "status" | "updateInfo" | "changePin" | "limits";

export interface CreditCard {
  id: string;
  type: "visa" | "mastercard" | "unionpay" | "jcb";
  cardNumber: string;
  lastFourDigits: string;
  holderName: string;
  expiryDate: string;
  category: "credit" | "debit";
  isActive: boolean;
  linkedAccount?: string;
  balance: number;
  creditLimit?: number;
  availableCredit?: number;
  temporaryLimit?: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("list");
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);

  const handleNavigate = (screen: Screen, card?: CreditCard) => {
    if (card) setSelectedCard(card);
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (currentScreen === "detail") {
      setCurrentScreen("list");
    } else if (currentScreen === "payment" || currentScreen === "statement" || currentScreen === "status") {
      setCurrentScreen("detail");
    } else if (currentScreen === "updateInfo" || currentScreen === "changePin" || currentScreen === "limits") {
      setCurrentScreen("detail");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentScreen === "list" && (
          <CardListScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === "detail" && selectedCard && (
          <CardDetailScreen 
            card={selectedCard} 
            onBack={handleBack}
            onNavigate={handleNavigate}
          />
        )}
        {currentScreen === "payment" && selectedCard && (
          <PaymentScreen 
            card={selectedCard} 
            onBack={handleBack}
          />
        )}
        {currentScreen === "statement" && selectedCard && (
          <MiniStatementScreen 
            card={selectedCard} 
            onBack={handleBack}
          />
        )}
        {currentScreen === "status" && selectedCard && (
          <CardStatusScreen 
            card={selectedCard} 
            onBack={handleBack}
          />
        )}
        {currentScreen === "updateInfo" && selectedCard && (
          <UpdateCardInfoScreen 
            card={selectedCard} 
            onBack={handleBack}
          />
        )}
        {currentScreen === "changePin" && selectedCard && (
          <ChangePinScreen 
            card={selectedCard} 
            onBack={handleBack}
          />
        )}
        {currentScreen === "limits" && selectedCard && (
          <TransactionLimitScreen 
            card={selectedCard} 
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
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