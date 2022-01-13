export default function Date(dateString) {
  return (
    <div className="bg-white rounded-lg items-center m-2 flex flex-col">
      <label for="start">Seleccione Fecha:</label>

      <input
        type="date"
        id="start"
        name="trip-start"
        value="2018-07-22"
        min="2018-01-01"
        max="2018-12-31"
        className="m-2 bg-white"
      ></input>
    </div>
  );
}
