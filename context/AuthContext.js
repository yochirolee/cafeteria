import React, { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(false);
  const { pathname, events } = useRouter();
  const router = useRouter();

  useEffect(() => {
    // Check that a new route is OK

    const handleRouteChange = (url) => {
      if (url !== "/login" && !user) {
        router.push("/login");
      }
    };
    if (user) router.push("/");
    // Check that initial route is OK
    if (pathname !== "/login" && user === null) {
      router.push("/login");
    }

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};
