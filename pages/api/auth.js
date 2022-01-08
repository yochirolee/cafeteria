import { supabase } from "../../utils/supabaseClient";

const handler = (req, res) => {
  supabase.auth.api.setAuthCookie(req, res);
  console.log("API CALL")
};

export default handler;
