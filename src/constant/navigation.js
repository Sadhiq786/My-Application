
import {
  FaChartBar, FaBuilding, FaUsers, FaClock, FaUmbrellaBeach, 
  FaFileInvoiceDollar, FaBalanceScale, FaUniversity,
  FaRegListAlt, FaCogs, FaSitemap, FaUserPlus, FaUpload,
  FaSignOutAlt, FaCalendarAlt, FaClipboardList, FaListUl,
  FaTasks, FaEnvelopeOpenText, FaHistory, FaTools, FaFileSignature,
  FaCoins, FaFolderOpen, FaRegIdCard 
} from "react-icons/fa";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6"; 
import { HiMiniHome } from "react-icons/hi2";


export const MODULES = [
  { key: "dashboard",   name: "Dashboard",            icon: HiMiniHome,          route: "/dashboard" },
  { key: "employee",    name: "Employee Hub",         icon: FaUsers,             route: "/employee" },
  { key: "attendance",  name: "Attendance & Time",    icon: FaClock,             route: "/attendance" },
  { key: "leave",       name: "Leave Management",     icon: FaUmbrellaBeach,     route: "/leave" },
  { key: "payroll",     name: "Payroll Engine",       icon: FaSackDollar,        route: "/payroll" },
  { key: "payslips",    name: "Payslips & Payouts",   icon: FaFileInvoiceDollar, route: "/payslips" },
  { key: "compliance",  name: "Compliance & Statutory", icon: FaBalanceScale,    route: "/compliance" },
  { key: "finance",     name: "Finance & Loans",      icon: FaUniversity,        route: "/finance" },
  { key: "org",         name: "Organization",         icon: FaBuilding,          route: "/organization" },
  { key: "reports",     name: "Reports",              icon: FaRegListAlt,        route: "/reports" },
  { key: "settings",    name: "Settings & Admin",     icon: FaCogs,              route: "/settings" },
];

export const SUBMODULES = {
  org: [
    { key: "company-profile",  name: "Company Profile",     icon: FaBuilding,           route: "/organization/company-profile" },
    { key: "departments",      name: "Departments",         icon: FaSitemap,            route: "/organization/departments" },
    { key: "designations",     name: "Designations",        icon: FaRegIdCard,          route: "/organization/designations" },
    { key: "office-holidays",  name: "Office Holidays",     icon: MdOutlineHolidayVillage, route: "/organization/office-holidays" },
    { key: "org-chart",        name: "Organizational Chart",icon: FaClipboardList,      route: "/organization/org-chart" },
  ],

  employee: [
    { key: "list",             name: "Employee List",       icon: FaUsers,              route: "/employee/list" },
    { key: "add-edit",         name: "Add/Edit Employee",   icon: FaUserPlus,           route: "/employee/add-edit" },
    { key: "salary-structure", name: "Salary Structure Assignment", icon: FaCoins,     route: "/employee/salary-structure" },
    { key: "documents",        name: "Documents Upload",    icon: FaUpload,             route: "/employee/documents" },
    { key: "exit-tracker",     name: "Exit Tracker",        icon: FaSignOutAlt,         route: "/employee/exit-tracker" },
  ],

  attendance: [
    { key: "manual",           name: "Manual Attendance",   icon: FaListUl,             route: "/attendance/manual" },
    { key: "shift",            name: "Shift Scheduling",    icon: FaCalendarAlt,        route: "/attendance/shift" },
    { key: "wfh",              name: "Work from Home Tracker", icon: FaTasks,           route: "/attendance/wfh" },
    { key: "reports",          name: "Attendance Reports",  icon: FaFolderOpen,         route: "/attendance/reports" },
  ],

  leave: [
    { key: "types",            name: "Leave Types",         icon: FaListUl,             route: "/leave/types" },
    { key: "policies",         name: "Leave Policies",      icon: FaFileSignature,      route: "/leave/policies" },
    { key: "approvals",        name: "Approvals",           icon: FaEnvelopeOpenText,   route: "/leave/approvals" },
    { key: "calendar",         name: "Leave Calendar",      icon: FaCalendarAlt,        route: "/leave/calendar" },
  ],

  payroll: [
    { key: "run",              name: "Run Payroll",         icon: FaTools,              route: "/payroll/run" },
    { key: "drafts",           name: "Payroll Drafts",      icon: FaFolderOpen,         route: "/payroll/drafts" },
    { key: "adjustments",      name: "Adjustments",         icon: FaTasks,              route: "/payroll/adjustments" },
    { key: "history",          name: "Payroll History",     icon: FaHistory,            route: "/payroll/history" },
  ],

  payslips: [
    { key: "generate",         name: "Generate Payslips",   icon: FaFileInvoiceDollar,  route: "/payslips/generate" },
    { key: "email",            name: "Email Payslips",      icon: FaEnvelopeOpenText,   route: "/payslips/email" },
    { key: "bank-transfer",    name: "Bank Transfer Sheet", icon: FaUniversity,         route: "/payslips/bank-transfer" },
  ],

  compliance: [
    { key: "pf-esi",           name: "PF/ESI Setup",        icon: FaBalanceScale,       route: "/compliance/pf-esi" },
    { key: "tds",              name: "TDS Setup",           icon: FaCoins,              route: "/compliance/tds" },
    { key: "returns",          name: "Generate Returns",    icon: FaClipboardList,      route: "/compliance/returns" },
    { key: "reports",          name: "Statutory Reports",   icon: FaRegListAlt,         route: "/compliance/reports" },
  ],

  finance: [
    { key: "advance",          name: "Advance Requests",    icon: FaCoins,              route: "/finance/advance" },
    { key: "reimburse",        name: "Reimbursements",      icon: FaFolderOpen,         route: "/finance/reimbursements" },
    { key: "bonus",            name: "Bonus Tracker",       icon: FaTasks,              route: "/finance/bonus" },
  ],

  reports: [
    { key: "salary-register",  name: "Salary Register",     icon: FaRegListAlt,         route: "/reports/salary-register" },
    { key: "deductions",       name: "Deduction Reports",   icon: FaClipboardList,      route: "/reports/deductions" },
    { key: "custom",           name: "Custom Reports Builder", icon: FaTools,           route: "/reports/custom" },
  ],

  settings: [
    { key: "users",            name: "User Management",     icon: FaUsers,              route: "/settings/users" },
    { key: "roles",            name: "Roles & Permissions", icon: FaCogs,               route: "/settings/roles" },
    { key: "app",              name: "App Settings",        icon: FaTools,              route: "/settings/app" },
    { key: "logs",             name: "System Logs",         icon: FaHistory,            route: "/settings/logs" },
  ],
};
