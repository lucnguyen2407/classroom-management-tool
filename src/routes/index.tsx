import { Route, Routes } from "react-router-dom";
import SignIn from "@/components/SignIn";
import PrivateRoute from "./PrivateRoute";
import InstructorDashboard from "@/pages/InstructorDashboard";
import StudentDashboard from "@/pages/StudentDashboard";
import PhoneVerify from "@/components/PhoneVerify";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/verify" element={<PhoneVerify />} />
      {/* <Route path="/instructor" element={<InstructorDashboard />} /> */}
      <Route
        path="/instructor"
        element={
          <PrivateRoute
            element={<InstructorDashboard />}
            roleRequired="instructor"
          />
        }
      />
      <Route
        path="/student"
        element={
          <PrivateRoute element={<StudentDashboard />} roleRequired="student" />
        }
      />
    </Routes>
  );
}

export default AppRouter;
