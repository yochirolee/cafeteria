import { AuthContext } from "../context/AuthContext";
import { Component, useContext } from "react";
import NavBar from "../components/NavBar/navbar";


export default function AuthLayout({ children }) {
  const [user, setUser] = useContext(AuthContext);

  return (
    <>
      <NavBar session={user} />
      <div>{children}</div>
    </>
  );
}
