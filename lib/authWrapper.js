import { supabase } from "../utils/supabaseClient";

const authWrapper = (inner) => {
  return async (context) => {
    const { req } = context;
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
      return { props: {}, redirect: { destination: "/login" } };
    }
   

    if (inner) {
      return inner(context);
    }

    return { props: {user} };
  };
};

export default authWrapper;
