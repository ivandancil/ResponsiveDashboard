import { Route, Routes } from "react-router-dom"
import AdminDashboard from "../pages/AdminDashboard"
import AdminLayout from "../layouts/AdminLayout"


const Approutes = () => {
  return (
   <Routes>
      
        
      <Route
        path="/" // Change the path for admin routes
        element={<AdminLayout />}
      >
          <Route index element={<AdminDashboard />} /> 

      </Route>
   </Routes>
  )
}

export default Approutes