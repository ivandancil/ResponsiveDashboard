import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Profile from "../assets/profile-1.jpg";

// Import all necessary icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// Specific icons for a teacher or student perspective (optional, but good for distinction)
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'; // For assignments/grades
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined'; // For classes
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'; // For calendar/schedule


import { tokens } from "../theme";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode | null;
  selected: string;
  setSelected: (title: string) => void;
  isCollapsed: boolean;
}

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      {!isCollapsed && <Typography>{title}</Typography>}
    </MenuItem>
  );
};

// --- Type Definitions for Navigation Data ---
interface SubNavigationItem {
  title: string;
  to: string;
}

interface NavigationItem {
  title: string;
  to: string;
  icon: React.ReactNode;
  subItems?: SubNavigationItem[]; // subItems is optional
}

interface NavigationCategory {
  category: string;
  items: NavigationItem[];
}

// Define a type for the entire navigation structure
type NavigationData = NavigationCategory[];


// --- ADMIN NAVIGATION DATA ---
const adminNavigation: NavigationData = [
  {
    category: "",
    items: [
      {
        title: "Dashboard",
        to: "/admin",
        icon: <HomeOutlinedIcon />,
      },
    ],
  },
  {
    category: "Management",
    items: [
      {
        title: "User Management",
        to: "/admin/usermanagement",
        icon: <PeopleOutlinedIcon />,
        subItems: [
          { title: "Students", to: "/admin/studentmanagement" },
          { title: "Teachers", to: "/admin/teachermanagement" },
          { title: "All Users", to: "/admin/usermanagement" },
        ]
      },
      {
        title: "Academics",
        to: "/admin/academicmanagement",
        icon: <SchoolOutlinedIcon />,
        subItems: [
          { title: "Classes", to: "/admin/classmanagement" },
          { title: "Academic Setup", to: "/admin/academicmanagement" },
          { title: "Grading System", to: "/admin/gradingsystem" },
        ]
      },
      {
        title: "Contacts",
        to: "/admin/contacts",
        icon: <ContactsOutlinedIcon />,
      },
    ],
  },
  {
    category: "Information & Tools",
    items: [
      {
        title: "Reports",
        to: "/admin/reportanalytics",
        icon: <BarChartOutlinedIcon />,
      },
      {
        title: "Announcements",
        to: "/admin/announcement",
        icon: <AnnouncementOutlinedIcon />,
      },
    ],
  },
  {
    category: "System",
    items: [
      {
        title: "Settings",
        to: "/admin/settings",
        icon: <SettingsOutlinedIcon />,
      },
      {
        title: "Security",
        to: "/admin/security",
        icon: <SecurityOutlinedIcon />,
      },
    ],
  },
];

// --- TEACHER NAVIGATION DATA ---
const teacherNavigation: NavigationData = [
  {
    category: "",
    items: [
      {
        title: "Dashboard",
        to: "/teacher", // Teacher specific dashboard
        icon: <HomeOutlinedIcon />,
      },
    ],
  },
  {
    category: "Academics",
    items: [
      {
        title: "My Classes",
        to: "/teacher/myclasses",
        icon: <ClassOutlinedIcon />,
      },
      {
        title: "Grade Submissions",
        to: "/teacher/gradesubmissions",
        icon: <AssignmentOutlinedIcon />,
      },
      {
        title: "My Students",
        to: "/teacher/mystudents",
        icon: <PeopleOutlinedIcon />,
      },
    ],
  },
  {
    category: "Communication",
    items: [
      {
        title: "Announcements",
        to: "/teacher/announcements", // Teacher specific announcements
        icon: <AnnouncementOutlinedIcon />,
      },
      {
        title: "Messages",
        to: "/teacher/messages",
        icon: <ContactsOutlinedIcon />, // Using contacts icon for messages, adjust as needed
      },
    ],
  },
  {
    category: "Tools",
    items: [
      {
        title: "Calendar",
        to: "/teacher/calendar",
        icon: <CalendarTodayOutlinedIcon />,
      },
      {
        title: "Settings",
        to: "/teacher/settings",
        icon: <SettingsOutlinedIcon />,
      },
    ],
  },
];

// --- STUDENT NAVIGATION DATA ---
const studentNavigation: NavigationData = [
  {
    category: "",
    items: [
      {
        title: "Dashboard",
        to: "/student", // Student specific dashboard
        icon: <HomeOutlinedIcon />,
      },
    ],
  },
  {
    category: "Academics",
    items: [
      {
        title: "My Subject",
        to: "/student/mysubject",
        icon: <SchoolOutlinedIcon />,
      },
      {
        title: "My Grades",
        to: "/student/mygrades",
        icon: <AssignmentOutlinedIcon />,
      },
      {
        title: "Schedule",
        to: "/student/schedule",
        icon: <CalendarTodayOutlinedIcon />,
      },
    ],
  },
  {
    category: "Information",
    items: [
      {
        title: "Announcements",
        to: "/student/announcements", // Student specific announcements
        icon: <AnnouncementOutlinedIcon />,
      },
      {
        title: "Profile",
        to: "/student/profile",
        icon: <PeopleOutlinedIcon />, // Using people icon for profile, adjust as needed
      },
    ],
  },
];


interface SidebarComponentProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  userRole: string; // "admin", "teacher", "student", etc.
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ isCollapsed, toggleSidebar, userRole }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // --- Select the appropriate navigation data based on userRole ---
  let currentNavigationData: NavigationData;
  switch (userRole) {
    case "admin":
      currentNavigationData = adminNavigation;
      break;
    case "teacher":
      currentNavigationData = teacherNavigation;
      break;
    case "student":
      currentNavigationData = studentNavigation;
      break;
    default:
      currentNavigationData = []; // Or a "guest" navigation if applicable
      break;
  }

  return (
    <Box
      sx={{
        height: '100dvh',
        maxHeight: '100dvh',
        overflowY: 'auto',
        overflowX: 'hidden',

        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        "& .ps-menu-button .ps-menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button": {
          padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
           background: `${colors.primary[400]} !important`,
          "&:hover": {
            color: `${colors.blueAccent[500]} !important`,
            backgroundColor: `${colors.primary[500]} !important`,
            
          },
        },
        "& .ps-menu-button.ps-active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: `${colors.primary[500]} !important`,
          
        },
        "& .ps-menu-button.ps-active .ps-menu-label": {
          color: `${colors.greenAccent[500]} !important`,
        },
        "& .ps-menu-button .MuiTypography-root": {
          fontSize: { xs: ".6rem", sm: ".8rem", md: "1rem" },
        },
        "& .ps-submenu-content .ps-menu-button": {
          paddingLeft: "40px !important",
          fontSize: { xs: ".6rem", sm: ".7rem", md: ".9rem" },
        },
        "& .ps-submenu-content .MuiTypography-root": {
          fontSize: { xs: ".6rem", sm: ".7rem", md: ".9rem" },
        },
        "& .ps-menu-label": {
          fontSize: { xs: ".6rem", sm: ".8rem", md: "1rem" },
        },
        "& .ps-sidebar-root .MuiTypography-h3": {
          fontSize: { xs: ".8rem", sm: "1rem", md: "1.1rem" },
        },
        "& .ps-sidebar-root .MuiTypography-h5": {
          fontSize: { xs: ".6rem", sm: ".7rem", md: ".9rem" },
        },

        ...(isDesktop
          ? {
              position: 'relative',
            }
          : {
              position: 'fixed',
              top: 0,
              left: 0,
              width: isCollapsed ? '0px' : '300px',
              zIndex: 110,
              transition: 'width 0.3s ease-in-out',
              boxShadow: theme.shadows[5],
            }),
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        width="300px"
        collapsedWidth={isCollapsed ? "0px" : "80px"}
        style={{ height: '100%' }}
      >
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={toggleSidebar}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="3px"
              >
                <Typography
                  variant="h6"
                  color={colors.grey[100]}
                  sx={{ fontSize: { xs: ".8rem", sm: "1rem", md: "1.1rem" } }}
                >
                  AdminDashboard.
                </Typography>
                <MenuOutlinedIcon
                    style={{
                      transition: "transform 0.3s ease-in-out",
                      transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                      opacity: isCollapsed ? 0 : 1,
                      color: "white",
                      cursor: "pointer"
                    }}
                  />
              </Box>
            )}
          </MenuItem>

          {/* USER PROFILE */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={Profile}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="500"
                  sx={{ fontSize: { xs: ".8rem", sm: "1.2rem", md: "1.5rem" }, m: "10px 0 0 0" }}
                >
                  IvanDancil
                </Typography>
                <Typography
                    variant="h5"
                    color={colors.grey[200]}
                    sx={{ fontSize: { xs: ".6rem", sm: ".7rem", md: ".9rem" } }}
                >
                  --- {userRole.charAt(0).toUpperCase() + userRole.slice(1)} {/* Display role here */}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS - NOW DYNAMICALLY LOADED */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {currentNavigationData.map((categoryGroup, index) => (
              <React.Fragment key={index}>
                {/* Category Title */}
                {categoryGroup && categoryGroup.category && categoryGroup.items.length > 0 && (
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{
                      fontSize: { xs: ".6rem", sm: ".7rem", md: ".9rem" },
                      m: "15px 0 5px 20px",
                    }}
                  >
                    {!isCollapsed && categoryGroup.category}
                  </Typography>
                )}

                {/* Render Items or SubMenus */}
                {categoryGroup && categoryGroup.items.map((item) => (
                  item.subItems && item.subItems.length > 0 ? (
                    <SubMenu
                      key={item.title}
                      label={!isCollapsed ? item.title : ''}
                      icon={item.icon}
                      className={selected.includes(item.title) || item.subItems.some(sub => sub.title === selected) ? 'ps-active' : ''}
                      defaultOpen={item.subItems.some(sub => sub.title === selected)}
                    >
                      {item.subItems.map(subItem => (
                        <Item
                          key={subItem.title}
                          title={subItem.title}
                          to={subItem.to}
                          icon={null}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                        />
                      ))}
                    </SubMenu>
                  ) : (
                    <Item
                      key={item.title}
                      title={item.title}
                      to={item.to}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                      isCollapsed={isCollapsed}
                    />
                  )
                ))}
              </React.Fragment>
            ))}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;