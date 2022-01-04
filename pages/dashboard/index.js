import SideBarDashboard from "../../components/dashboard/sideBarDashboard";
import MainDashBoard from "../../components/dashboard/mainDashboard";
import AuthLayout from "../../layout/AuthLayout";
import DashBoardLayout from "../../layout/DashBoardLayout";

export default function Dashboar() {
  return (
    <DashBoardLayout>
      <MainDashBoard />
    </DashBoardLayout>
  );
}
