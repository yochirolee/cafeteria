import { useContext } from "react";
import NavBar from "../components/NavBar/navbar";
import { AuthContext } from "../context/AuthContext";


export default function AuthLayout({ children }) {
  const [user, setUser] = useContext(AuthContext);
  //const [user]=useState(true)
  return (
    <>
     
      <div>{children}</div>
    </>
  );
}
