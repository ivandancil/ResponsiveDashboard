import { IconButton, InputBase, useTheme, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"; // Import the hamburger icon
import { ColorModeContext, tokens } from "../theme";

interface TopbarProps {
  toggleSidebar: () => void; // Prop to toggle the sidebar's collapsed state
}

const Topbar = ({ toggleSidebar }: TopbarProps) => { // Destructure toggleSidebar from props
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const isAboveMediumScreens = useMediaQuery(theme.breakpoints.up("md"));

  return (
    // Main container for the top bar - using a div instead of Box
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(2),
        
      }}
    >
      {/* Left Section: Search Bar and Hamburger Icon */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Hamburger Icon - now always visible */}
        <IconButton onClick={toggleSidebar} sx={{ mr: 1 }}> {/* Add right margin */}
          <MenuOutlinedIcon />
        </IconButton>

        {/* Search Bar Section - using a div instead of Box */}
        <div
          style={{
            display: "flex",
            backgroundColor: colors.primary[400],
            borderRadius: "3px",
          }}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>


      {/* Right Section: Icons and Mobile Menu Toggle - using a div instead of Box */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* PersonOutlinedIcon - Visible only on small screens */}
        {!isAboveMediumScreens && (
          <IconButton onClick={() => setOpenMobileMenu(!openMobileMenu)}>
            <PersonOutlinedIcon  /> {/* Always show PersonOutlinedIcon */}
          </IconButton>
        )}

        {/* Regular Icons Container - using a div instead of Box */}
        <div
          style={{
            display: (isAboveMediumScreens || openMobileMenu) ? "flex" : "none",
            flexDirection: isAboveMediumScreens ? "row" : "column",
            // Desktop styles
            ...(isAboveMediumScreens && {
                position: 'static',
                gap: theme.spacing(1), // Use theme.spacing for gap consistency
            }),
            // Mobile menu open styles
            ...(!isAboveMediumScreens && openMobileMenu && {
                position: 'absolute',
                top: '70px', // Adjust as per your actual topbar height
                right: '16px',
                padding: theme.spacing(2),
                borderRadius: '8px',
                boxShadow: theme.shadows[3],
                backgroundColor: colors.primary[400],
                zIndex: 50,
                gap: theme.spacing(1), // Use theme.spacing for gap consistency
            }),
          }}
        >
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon  sx={{ fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }} />
            ) : (
              <LightModeOutlinedIcon  sx={{ fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }} />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon 
            sx={{ fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }} />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon 
             sx={{ fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }} />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon 
             sx={{ fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" } }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Topbar;