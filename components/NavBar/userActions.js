import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";
export default function UserActions({ toggle, user }) {
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <>
      {!toggle ? (
        <></>
      ) : (
        <div className="w-64  z-30 absolute  border top-12 right-0 lg:right-14 rounded-md border-gray-500 bg-gray-700 text-white ">
          <div className="my-px">
            <div className="p-4 text-center text-gray-400">{user.email}</div>
            <div className="border-b border-dashed border-gray-600"></div>
            <Link href={"/dashboard"}>
              <span className="flex flex-row items-center h-10 px-3  text-gray-500 hover:bg-gray-600 hover:text-white ">
                <span className="flex items-center justify-center text-lg text-gray-400">
                  <i className="las la-user-cog text-2xl"></i>
                </span>
                <span className="ml-3">Dashboard</span>
              </span>
            </Link>
            <Link href={"/login"}>
              <span
                onClick={handleLogOut}
                className="flex flex-row items-center h-10 px-3  text-gray-500 hover:bg-gray-600 hover:text-white"
              >
                <span className="flex items-center justify-center text-lg text-gray-400">
                  <i className="las la-sign-out-alt text-2xl"></i>
                </span>

                <span className="ml-3">Salir</span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
