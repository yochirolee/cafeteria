import { useEffect, useState } from "react";
import { createNewDayOrGetCurrentDay } from "../../utils/days_lib";

export default function Date() {
  const [today, setToday] = useState("");

  useEffect(async () => {
    const getCurrentDay =async()=>{
    const { day: _today } = await createNewDayOrGetCurrentDay();
    setToday([_today.created_at]);
    console.log(_today);}
    getCurrentDay();
  }, [today.created_at]);


  const handleDayChange=()=>{
    alert("day change")
  }
  return (
    <div className="bg-white rounded-lg items-center m-2 flex flex-col">
      <label for="start">Seleccione Fecha:</label>

      <input
        type="date"
        id="start"
        name="trip-start"
        value={today}
        min="2022-01-01"
        max="2050-12-31"
        className="m-2 bg-white"
      ></input>
    </div>
  );
}
