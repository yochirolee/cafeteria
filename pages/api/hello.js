import { supabase } from "../../utils/supabaseClient";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
supabase;
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      const { data, error } = await supabase
        .from("product")
        .select()
        .order("id");

      if (!error) res.status(200).json(JSON.stringify(data, 0, 2));
      else res.status(500).json(JSON.stringify(error, 0, 2));

      break;

    case "POST":
      
      break;

    default:
      break;
  }
};
