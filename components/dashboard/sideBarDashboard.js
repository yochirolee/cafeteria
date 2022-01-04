import { useState } from "react";

export default function SideBarDashboard() {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      id="sidebar"
      class="flex flex-row  bg-gray-800 "
    >
     <div>
        <ul class=" flex flex-row">
          <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 bg-gray-900">
            <a
              aria-current="page"
              class="block text-gray-200  truncate transition duration-150 hover:text-gray-200 active"
              href="/dashboard"
            >
              <div class="flex items-center">
                <i className="las la-home text-xl"></i>
                <span class="text-sm font-medium ml-3  duration-200">
                  Dashboard
                </span>
              </div>
            </a>
          </li>
          <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 false">
            <a
              aria-current="page"
              class="block text-gray-200 hover:text-white truncate transition duration-150 false active"
              href="/dashboard/users"
            >
              <div class="flex items-center">
                <i className="las la-user text-xl"></i>
                <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Usuarios
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
