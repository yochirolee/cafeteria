import React, { useState, useEffect, createContext } from "react";
import { createNewDayOrGetCurrentDay } from "../utils/days_lib";

export const CurrentDayContext = createContext();
export const CurrentDayProvider = (props) => {
  const [currentDay, setCurrentDay] = useState([]);
  const [error, setError] = useState(null);

  useEffect(async () => {
    const getData = async () => {
      const { day, error } = await createNewDayOrGetCurrentDay();

      error ? setError(error) : setCurrentDay(day);
    };

    await getData();
  }, [currentDay.id]);

  return (
    <CurrentDayContext.Provider value={[currentDay, setCurrentDay]}>
      {props.children}
    </CurrentDayContext.Provider>
  );
};
