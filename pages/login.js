import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function Login() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    setError(false);
    setLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (user) {
      setUser(user);
      router.push("/");
    } else {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto  h-screen pt-20">
      <div
        id="authentication-modal"
        aria-hidden="true"
        className="  lg:w-2/4  z-50 mx-auto   md:h-full md:inset-0"
      >
        <div className=" px-4 mx-auto w-full max-w-md h-full md:h-auto">
          <div className=" bg-white pt-4 rounded-lg shadow dark:bg-gray-700">
            <form
              className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Por favor, entre sus credenciales
              </h3>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="????????????????????????"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                     
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Recordarme
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:underline dark:text-gray-500"
                >
                  Restablecer Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                {loading ? "Por favor Espere" : "Autenticarse"}
              </button>
              {error ? (
                <div className=" text-center">
                  <p className=" text-red-500">{error.message}</p>
                </div>
              ) : (
                <></>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: "/" } };
  }

  return { props: {} };
}
