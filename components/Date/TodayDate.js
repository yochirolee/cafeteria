import { useState, useEffect } from "react";
import moment from "moment";
import { createNewDayOrGetCurrentDay } from "../../utils/days_lib";

export default function TodayDate() {
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(async () => {
    const getCurrentDay = async () => {
      const { day, error } = await createNewDayOrGetCurrentDay();

      setCurrentDay(day);
    };

    await getCurrentDay();
    console.log(currentDay, "Current Day from TodayDate Component");
  }, []);

  return currentDay ? (
    <div className="text-gray-400 ">
      Fecha: {moment(currentDay.created_at).format("DD-MM-YYYY")}
    </div>
  ) : (
    <></>
  );
}
