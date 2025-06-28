import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SidebarComponent from "../components/SidebarComponent";
import Topbar from "../components/Topbar";

const AdminLayout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  const muiTheme = useTheme(); // Get the MUI theme to access breakpoints
  // Determine if the screen is large (e.g., desktop)
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up("md")); // You can adjust "md" to "lg" if you prefer a larger breakpoint

  // Initialize isSidebarCollapsed based on whether it's a desktop screen.
  // If it's desktop, isSidebarCollapsed should be false (sidebar visible).
  // If it's not desktop, isSidebarCollapsed should be true (sidebar collapsed).
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(!isDesktop);

  // --- START: Add user role state ---
  // IMPORTANT: In a real application, replace this with actual authentication
  // logic to get the user's role (e.g., from a login API, context, or Redux store).
  const [userRole] = useState("admin"); // Default to "admin" for testing
  // You might fetch this from localStorage, a context, or an API call on mount
  useEffect(() => {
    // Example: Simulate fetching user role after login
    // const fetchedRole = localStorage.getItem('userRole') || 'student'; // Get role from storage
    // setUserRole(fetchedRole);
  }, []);
  // --- END: Add user role state ---


  // Use useEffect to update isSidebarCollapsed when the screen size changes
  useEffect(() => {
    setIsSidebarCollapsed(!isDesktop);
  }, [isDesktop]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <Box display="flex" height="100vh">
      {/* Pass userRole to SidebarComponent */}
      {!hideLayout && (
        <SidebarComponent
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          userRole={userRole} // <-- HERE: Pass the userRole prop
        />
      )}

      <Box flexGrow={1} sx={{ minHeight: "100vh", overflowY: "auto" }}>
        {!hideLayout && <Topbar toggleSidebar={toggleSidebar} />}

        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;