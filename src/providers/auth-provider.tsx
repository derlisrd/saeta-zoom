import { useState, useContext, createContext, useEffect } from "react";
import { supabase } from "@/services/libs/supabase";

interface AuthContextTypes {}

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const values = {};
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
