import DashboardProfile from "../Pages/DashboardProfile";
import Dashboard from "./Dashboard";
import '../Styles/DashboardLayoutProfile.css';
export default function DashboardLayoutProfile () {
    return (
        <div className="dashboard-layout-profile">
           <Dashboard />
           <DashboardProfile /> 
        </div>
    )
}