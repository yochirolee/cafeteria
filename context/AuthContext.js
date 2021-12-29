import React, { useState, createContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = (props) => {
  const [session, setSession] = useState(null);

  return (
    <AuthContext.Provider value={[session, setSession]}>
      {props.children}
    </AuthContext.Provider>
  );
};
