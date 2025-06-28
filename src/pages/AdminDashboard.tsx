import { Box, Grid, Paper, Typography, colors } from "@mui/material"

import { GroupOutlined } from '@mui/icons-material';
import Header from "../components/Header";

const AdminDashboard = () => {

      // ✅ Overview Data with fixed structure
      const overviewData = [
        {
          title:  11,
          subtitle: "Total Number of Students" ,
          icon: <GroupOutlined sx={{ fontSize: 30, color: "#3498db" }} />,
        },
         {
          title:  11,
          subtitle: "Total Number of Students",
          icon: <GroupOutlined sx={{ fontSize: 30, color: "#3498db" }} />,
        },
        {
          title:  11,
          subtitle: "Total Number of Students",
          icon: <GroupOutlined sx={{ fontSize: 30, color: "#3498db" }} />,
        },
        
      ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Admin Dashboard" subtitle="Welcome to your Dashboard"/>
      </Box>

       {/* Overview Section */}
      <Grid container spacing={2} mt={0.5}>
        {overviewData.map((item) => (
      
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: colors.grey[100],
                height: "110px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.icon}
              <Typography variant="h6" fontWeight="bold" mt={1} fontSize="16px">
                {item.title}
              </Typography>
              <Typography variant="body2" fontSize="12px">
                {item.subtitle}
              </Typography>
            </Paper>
         
          
        ))}
       
      </Grid>
      
    </Box>
  )
}

export default AdminDashboard