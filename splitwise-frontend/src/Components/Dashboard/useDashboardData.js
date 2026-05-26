import { useEffect, useState } from "react";
import API from "../../services/api";

function useDashboardData() {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboard = async () => {
    try {
      const response = await API.get("/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const settlements = dashboardData ? getSettlements(dashboardData) : [];

  return {
    dashboardData,
    settlements,
    loading: !dashboardData,
  };
}

function getSettlements(dashboardData) {
  const netBalances = {};

  dashboardData.owedToYou.forEach((person) => {
    netBalances[person.name] =
      (netBalances[person.name] || 0) + Number(person.amount);
  });

  dashboardData.youOwe.forEach((person) => {
    netBalances[person.name] =
      (netBalances[person.name] || 0) - Number(person.amount);
  });

  return Object.entries(netBalances)
    .filter(([_, balance]) => balance !== 0)
    .map(([name, balance]) => ({
      name,
      amount: Math.abs(balance).toFixed(2),
      type: balance > 0 ? "Owes You" : "You Owe",
    }));
}

export default useDashboardData;
