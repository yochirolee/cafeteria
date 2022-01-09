import NavBarDashBoard from "../components/NavBar/navBarDashBoard";

export default function DashBoardLayout({ children,user }) {
  return (
    <>
      <NavBarDashBoard user={ user } />
      <div>{children}</div>
    </>
  );
}
