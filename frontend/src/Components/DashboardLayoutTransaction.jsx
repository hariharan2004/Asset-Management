import DashboardTransaction from "../Pages/DashboardTransaction";
import Dashboard from "./Dashboard";
import '../Styles/DashboardLayoutTransaction.css';
export default function DashboardLayoutTransaction () {
    return (
        <div className="dashboard-layout-transaction">
           <Dashboard />
           <DashboardTransaction /> 
        </div>
    )
}