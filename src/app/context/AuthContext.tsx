"use client"; // Mark this as a Client Component

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

interface User {
  token: string;
  // Add other user properties here if needed
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user", {
          credentials: "include",
        }); // Include cookies
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUser(data.user); // Store user data
      } catch (error) {
        console.error("User fetch failed:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      }); // Call the backend to clear the token
    } catch (error) {
      console.error("Logout failed:", error);
    }
    Cookies.remove("token"); // Remove the token from cookies
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
