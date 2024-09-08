import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { getUser } from "../api";

import { User } from "../types/User";
import { AuthContextType } from "../types/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const queryClient = useQueryClient();

  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery<User, AxiosError>({
    queryKey: ["user", token],
    queryFn: getUser,
    retry: 2,
  });

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (!isPending && !user && isError) {
      localStorage.clear();
    }
  }, [isError, user, isPending]);

  const updateToken = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{ user, isPending, isError, error, token, updateToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
