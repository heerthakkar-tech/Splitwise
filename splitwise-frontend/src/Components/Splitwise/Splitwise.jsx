import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import Expenses from "../Expenses/Expenses";
import ProtectedRoute from "../Auth/ProtectedRoute";
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../Auth/NotFound";

function Splitwise() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Splitwise;
