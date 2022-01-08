import { supabase } from "../utils/supabaseClient";

const authWrapper = (inner) => {
  return async (context) => {
    const { req } = context;
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
      return { props: {}, redirect: { destination: "/login" } };
    }
    console.log(user)

    if (inner) {
      return inner(context);
    }

    return { props: {} };
  };
};

export default authWrapper;
