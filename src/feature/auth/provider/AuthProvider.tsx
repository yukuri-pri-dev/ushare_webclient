import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { firebase } from "@/lib/firebase/firebase";
import "firebase/auth";

type User = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
};

type GlobalAuthState = {
  user: User | null | undefined;
};

const initialState: GlobalAuthState = {
  user: undefined,
};
const AuthContext = createContext<GlobalAuthState>(initialState);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<GlobalAuthState>(initialState);

  useEffect(() => {
    try {
      const auth = firebase.auth();
      return auth.onAuthStateChanged((user) => {
        setUser({
          user,
        });
      });
    } catch (error) {
      setUser(initialState);
      throw error;
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
