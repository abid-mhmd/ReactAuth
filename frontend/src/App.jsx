import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboad from "./pages/admin/Dashboard";
import ProtectedRoute from "./routes/ProectedRoute";
import AdminProtectedRoute from "./routes/AdminRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Prfile />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <Dashboad />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
