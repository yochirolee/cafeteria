import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth/Auth";
import Account from "../components/Account/Account";
import { useState, useEffect } from "react";

export default function Login() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container bg-white mx-auto mt-20 flex flex-col h-64 p-10">
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
