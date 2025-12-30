"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getCookie } from "@/utils/cookies";
import { setCredentials } from "@/store/slices/authSlice";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getCookie("token");

      if (!token) {
        router.replace("/authentication/login");
        return;
      }

      if (token && !isAuthenticated) {
        // Restore session
        let restoredUser = user;
        if (!restoredUser && typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              restoredUser = JSON.parse(storedUser);
            } catch (e) {
              console.error("Failed to parse user from localStorage", e);
            }
          }
        }
        dispatch(setCredentials({ token, user: restoredUser || null }));
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [router, isAuthenticated, dispatch, user]);

  if (isChecking && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

