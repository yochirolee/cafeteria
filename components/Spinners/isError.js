export default function IsError() {
  return (
    <div className=" text-center  rounded-lg  items-center   m-2 p-2 ">
      <div className=" rounded-full w-1/2 mx-auto bg-red-500/20 py-2 ">
        <i className="las la-exclamation-triangle  text-red-200 text-2xl text-center"></i>
        <p className="text-xs text-red-200 pt-2">Ups algo ha salido mal...</p>
      </div>
    </div>
  );
}
