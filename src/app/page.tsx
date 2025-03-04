"use client";
import LoginForm from "@/components/login-form";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen">
      {user ? (
        <div className="p-6 bg-green-500 text-white text-xl rounded-lg">
          <p>Welcome, {user.displayName}!</p>
          <button
            className="mt-4 bg-red-500 px-4 py-2 rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <LoginForm />
        </div>
      )}
    </div>
  );
}
