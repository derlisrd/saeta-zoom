import LoadingScreen from "@/components/feedback/loading-screen";
import { useAuth } from "@/providers/auth-provider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    navigate("/");
  }, []);

  return <LoadingScreen />;
}
