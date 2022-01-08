import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";
export default function UserActions({ toggle }) {
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <>
      {!toggle ? (
        <></>
      ) : (
        <div className="w-64 right-48  z-30 relative mr-8 border top-3 rounded-md  bg-white ">
          <div class="my-px">
            <Link href={"/dashboard"}>
              <a
                href="#"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="flex items-center justify-center text-lg text-gray-400">
                  <i className="las la-user-cog text-2xl"></i>
                </span>
                <span class="ml-3">Dashboard</span>
              </a>
            </Link>
            <Link href={"/login"}>
              <a
                href="#"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="flex items-center justify-center text-lg text-gray-400">
                  <i className="las la-sign-out-alt text-2xl"></i>
                </span>

                <span class="ml-3" onClick={handleLogOut}>
                  Logout
                </span>
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
