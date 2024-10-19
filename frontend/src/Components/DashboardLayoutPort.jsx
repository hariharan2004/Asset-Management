import DashboardVault from "../Pages/DashboardPort";
import Dashboard from "./Dashboard";
import '../Styles/DashboardLayoutPort.css';
export default function DashboardLayoutPort () {
    return (
        <div className="dashboard-layout-port">
           <Dashboard />
           <DashboardVault /> 
        </div>
    )
}