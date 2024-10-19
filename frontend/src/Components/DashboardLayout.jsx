import DashboardVault from "../Pages/DashboardVault";
import Dashboard from "./Dashboard";
import '../Styles/DashboardLayoutVault.css';
export default function DashboardLayout () {
    return (
        <div className="dashboard-layout-vault">
           <Dashboard />
           <DashboardVault /> 
        </div>
    )
}