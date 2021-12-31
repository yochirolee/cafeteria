import { AuthContext } from "../context/AuthContext";
import { Component, useContext } from "react";
import NavBar from "../components/NavBar/navbar";


export default function AuthLayout({ children }) {
  const [session, setSession] = useContext(AuthContext);
  return (
    <>
      <NavBar session={session} />
      <div>{children}</div>
    </>
  );
}
