import React, { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const { pathname, events } = useRouter();

  useEffect(() => {
    // Check that a new route is OK

    const handleRouteChange = (url) => {
      if (url !== "/login" && !user) {
        window.location.href = "/login";
      }
    };

    // Check that initial route is OK
    if (pathname !== "/login" && user === null) {
      window.location.href = "/login";
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
