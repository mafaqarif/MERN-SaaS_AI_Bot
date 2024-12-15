import { ReactNode, createContext, useEffect, useState } from "react";

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
const AutContext = createContext<UserAuth | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedin] = useState(false);

  useEffect(() => {}, []);

  const login = async (email: String, password: String) => {};
  const signup = async (name: String, email: String, password: String) => {};
  const logout = async () => {};
};
