import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDayPicker({
  startDate,
  activeDays,
  handleDateSelect,
  handleDateChange,
}) {
  return (
    <div className="flex flex-row items-center justify-center mx-2 rounded-lg my-2 p-2 bg-white">
      <div className="text-slate-600 inline-flex items-center ">
        <DatePicker
          className="text-center focus:outline-none font-bold"
          selected={startDate}
          onSelect={handleDateSelect}
          onChange={(date) => handleDateChange(date)}
          includeDates={activeDays.map((day) => {
            var dateArray = day.created_at.split("-");
            var year = dateArray[0];
            var month = parseInt(dateArray[1], 10) - 1;
            var date = dateArray[2];
            var _entryDate = new Date(year, month, date);
            return _entryDate;
          })}
        />
        <i className="las la-calendar-plus text-cyan-700  text-2xl "></i>
      </div>
    </div>
  );
}
