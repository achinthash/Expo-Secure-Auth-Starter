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
    let isMounted = true;

    const init = async () => {
      try {
        // small delay to avoid native race issues (important in release builds)
        await new Promise((res) => setTimeout(res, 100));

        const pin = await getPin();

        if (!isMounted) return;

        if (pin) {
          setHasPin(true);
          setIsUnlocked(false);
        } else {
          setHasPin(false);
          setIsUnlocked(true);
        }
      } catch (e) {
        console.log("Auth init error:", e);

        if (!isMounted) return;

        // safe fallback
        setHasPin(false);
        setIsUnlocked(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshPin = async () => {
    try {
      setIsLoading(true);

      const pin = await getPin();

      if (pin) {
        setHasPin(true);
        setIsUnlocked(false);
      } else {
        setHasPin(false);
        setIsUnlocked(true);
      }
    } catch (e) {
      console.log("refreshPin error:", e);
      setHasPin(false);
      setIsUnlocked(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        hasPin,
        isUnlocked,
        isLoading,
        setIsUnlocked,
        refreshPin,
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
