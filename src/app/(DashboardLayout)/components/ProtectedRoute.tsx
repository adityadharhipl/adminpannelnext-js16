// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     // If no token → redirect to login
//     if (!token) {
//       router.replace("/authentication/login");
//       return;
//     }
//   }, [router]);

//   return <>{children}</>;
// }


"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token and no user → redirect
    if (!token && !user) {
      router.replace("/authentication/login");
    }
  }, [router, user]);

  return <>{children}</>;
}

