import { useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function SignIn() {
  const doSignIn = async () => {
    const { user, session, error } = await supabase.auth.signUp(
      {
        email: "yleecruz@gmail.com",
        password: "Valentina2020",
      },
      {
        data: {
          role: "Admin",
        },
      }
    );
    console.log(user,session,error,"SINGIN")
  };

  useEffect(async () => {
    await doSignIn();
  }, []);
  return <div>Sign In</div>;
}
