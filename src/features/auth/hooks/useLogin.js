import { useState } from "react";
import { loginAdmin } from "@/features/auth/api/authApi";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async ({ loginId, password }) => {
    try {
      setIsLoading(true);

      const data = await loginAdmin({
        loginId,
        password,
      });

      return data;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    submitLogin,
  };
}