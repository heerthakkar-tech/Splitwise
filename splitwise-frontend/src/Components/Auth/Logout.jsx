import { useNavigate } from "react-router-dom";
import "../../styles/logout.css";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
}
