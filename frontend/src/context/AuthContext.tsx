import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: String;
  email: String;
};
type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: String, password: String) => Promise<void>;
  signup: (name: String, email: String, password: String) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedin] = useState(false);

  useEffect(() => {}, []);

  const login = async (email: String, password: String) => {};
  const signup = async (name: String, email: String, password: String) => {};
  const logout = async () => {};

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
