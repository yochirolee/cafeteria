import NavBarDashBoard from "../components/NavBar/navBarDashBoard";

export default function DashBoardLayout({ children }) {
  return (
    <>
      <NavBarDashBoard />
      <div>{children}</div>
    </>
  );
}
