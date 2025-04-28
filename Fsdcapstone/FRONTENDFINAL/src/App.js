import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ManagerSignIn from "./components/ManagerSignIn";
import EmployeeSignIn from "./components/EmployeeSignIn";
import ManagerDashBoard from "./components/ManagerDashBoard";
import KanbanBoard from "./components/KanbanBoard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/manager/signin" element={<ManagerSignIn />} />
          <Route path="/employee/signin" element={<EmployeeSignIn />} />
          <Route path="/manager/dashboard" element={<ManagerDashBoard />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
