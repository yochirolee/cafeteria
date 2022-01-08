import DashBoardLayout from "../../layout/DashBoardLayout";
import { useForm } from "react-hook-form";
import { supabase } from "../../utils/supabaseClient";
import authWrapper from "../../lib/authWrapper";
import UsersTable from "../../components/Table/UsersTable";

export default function Users() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    console.log(email, "email");
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (user) {
      setUser(user);
    }
  };

  return (
    <DashBoardLayout>
      <div className="col-span-full container mx-auto xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200 m-2">
        <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b mb-2 border-gray-100">
            <h2 className="font-semibold text-gray-800">Usuarios</h2>
          </header>
          <div className=" flex flex-col lg:flex-row">
            <div className="md:w-1/3 mx-4 md:h-auto">
              <div className=" bg-white pt-4 lg:border-r border-gray-100">
                <form
                  className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Crear nuevo usuario
                  </h3>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Email
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
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <div>
                    <label
                      for="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Role
                    </label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                      <option>Administador</option>
                      <option>Dependiente</option>
                      <option>Custodio</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  >
                    Crear Usuario
                  </button>
                </form>
              </div>
            </div>
            <UsersTable />
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
}

export const getServerSideProps = authWrapper();
