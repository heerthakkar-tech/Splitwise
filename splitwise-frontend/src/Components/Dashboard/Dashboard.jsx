import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import Logout from "../Auth/Logout";
import DashboardHeader from "./DashboardHeader";
import SummaryCards from "./SummaryCards";
import PersonListSection from "./PersonListSection";
import SettlementSection from "./SettlementSection";
import useDashboardData from "./useDashboardData";

function Dashboard() {
  const navigate = useNavigate();
  const { dashboardData, settlements, loading } = useDashboardData();

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div className="dashboard-container">
      <Logout />
      <DashboardHeader />

      <SummaryCards totals={dashboardData.totals} />

      <br />
      <br />

      <div className="dashboard-sections">
        <PersonListSection
          title="People Who Owe You"
          people={dashboardData.owedToYou}
        />

        <PersonListSection
          title="People You Owe"
          people={dashboardData.youOwe}
        />

        <SettlementSection settlements={settlements} />
      </div>

      <br />
      <br />
      <br />

      <button className="expense-btn" onClick={() => navigate("/expenses")}>
        Add Expense
      </button>
    </div>
  );
}

export default Dashboard;
