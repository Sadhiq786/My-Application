import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../../public/loginForm/LoginForm.jsx";
import Dashboard from "../Modules/Dashboard/Dashboard.jsx";
import HeaderNavigation from "../../../components/HeaderNavigation/HeaderNavigation.jsx";
import Attendance from "../Modules/AttendanceAndTime/Attendance.jsx";
import LeaveManagement from "../Modules/LeaveManagement/LeaveManagement.jsx";
import PayrollEngine from "../Modules/PayrollEngine/PayrollEngine.jsx";
import PayslipsAndPayouts from "../Modules/PayslipsAndPayouts/PayslipsAndPayouts.jsx";
import Compliance from "../Modules/ComplianceAndStationary/Compliance.jsx";
import Finance from "../Modules/Finance/Finance.jsx";
import Organization from "../Modules/Organization/Organization.jsx";
import Reports from "../Modules/Reports/Reports.jsx";
import Settings from "../Modules/Setting/Settings.jsx";

const RequireAuth = ({ children }) =>
  localStorage.getItem("auth_username") ? (
    children
  ) : (
    <Navigate to="/loginForm" replace />
  );

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/loginForm" replace />} />
      <Route path="/loginForm" element={<LoginForm />} />
      <Route path="/dashboard" element={ <RequireAuth> <Dashboard/> </RequireAuth>}/>
      <Route path="/employee" element={ <RequireAuth> <HeaderNavigation/> </RequireAuth>}/>
      <Route path="/attendance" element={ <RequireAuth> <Attendance/> </RequireAuth>}/>
      <Route path="/leave" element={ <RequireAuth> <LeaveManagement/> </RequireAuth>}/>
      <Route path="/payroll" element={ <RequireAuth> <PayrollEngine/> </RequireAuth>}/>
      <Route path="/payslips" element={ <RequireAuth> <PayslipsAndPayouts/> </RequireAuth>}/>
      <Route path="/compliance" element={ <RequireAuth> <Compliance/> </RequireAuth>}/>
      <Route path="/finance" element={ <RequireAuth> <Finance/> </RequireAuth>}/>
      <Route path="/organization" element={ <RequireAuth> <Organization/> </RequireAuth>}/>
      <Route path="/reports" element={ <RequireAuth> <Reports/> </RequireAuth>}/>
      <Route path="/settings" element={ <RequireAuth> <Settings/> </RequireAuth>}/>
      <Route path="*" element={<Navigate to="/loginForm" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
