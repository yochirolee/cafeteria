import SideBarDashboard from "../components/dashboard/sideBarDashboard";
import NavBarDashBoard from "../components/NavBar/navBarDashBoard";
import AuthLayout from "./AuthLayout";

export default function DashBoardLayout({ children }) {
  return (
    <AuthLayout>
      <NavBarDashBoard/>
      <div>
        {children}
      </div>
    </AuthLayout>
  );
}
