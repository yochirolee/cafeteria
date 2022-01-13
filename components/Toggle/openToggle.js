import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function OpenToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className=" flex flex-row  items-center  ">
      <p className="mr-2 text-gray-500 font-semibold">{enabled ? "Abierto" : "Cerrado"}</p>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-green-600" : "bg-gray-700"}
          relative inline-flex flex-shrink-0 h-[28px] w-[46px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
}
