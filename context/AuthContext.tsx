import { getPin } from "@/utills/secureStorage";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  hasPin: boolean;
  isUnlocked: boolean;
  isLoading: boolean;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPin: () => Promise<void>;
  setHasPin: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [hasPin, setHasPin] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPin();
  }, []);

  const checkPin = async () => {
    const pin = await getPin();

    if (pin) {
      setHasPin(true);
      setIsUnlocked(false);
    } else {
      setHasPin(false);
      setIsUnlocked(true);
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        hasPin,
        isUnlocked,
        isLoading,
        setIsUnlocked,
        refreshPin: checkPin,
        setHasPin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
