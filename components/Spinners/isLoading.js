export default function IsLoading() {
  return (
    <div className="text-gray-400 text-center  rounded-lg  items-center   m-2 p-2 ">
    
      <div className=" rounded-full w-1/2 mx-auto bg-red-500/20 py-2 ">
        <i className="las la-spinner animate-spin text-red-200 text-2xl text-center"></i>
        <p className="text-xs text-red-200 pt-2">Cargando por favor espere...</p>
      </div>
    </div>
  );
}
