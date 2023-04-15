import { BrowserRouter, Routes, Route } from "react-router-dom";

//utils
import MentorPrivateRoutes from "./utils/MentorPrivateRoutes";
import StudentPrivateRoutes from "./utils/StudentPrivateRoutes";
import AdminPrivateRoutes from "./utils/AdminPrivateRoutes";

// pages & components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Protected from "./pages/Protected";
import Signup2 from "./pages/Signup2";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentSignup from "./pages/StudentSignup";
import AdminSignup from "./pages/AdminSignup";
import ProtectedStudent from "./pages/ProtectedStudent";
import AdminLand from "./pages/AdminLand";
import Notaccepted from "./pages/Notaccepted";
import Not404 from "./pages/404";
import AdminRejected from "./pages/AdminRejected";
import AdminAccept from "./pages/AdminAccept";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/signup" element={<StudentSignup />} />
            <Route path="/complete_details" element={<Signup2 />} />
            <Route path="/admin/login/boardspace" element={<AdminLogin />} />
            <Route path="/admin/signup/boardspace" element={<AdminSignup />} />
            <Route path="/notaccepted" element={<Notaccepted />} />
            <Route element={<MentorPrivateRoutes />}>
              <Route path="/youin" element={<Protected />} />
            </Route>
            <Route element={<StudentPrivateRoutes />}>
              <Route path="/studentin" element={<ProtectedStudent />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
            <Route element={<AdminPrivateRoutes />}>
              <Route path="/admin/landing" element={<AdminLand />} />
              <Route path="/admin/rejected/reqs" element={<AdminRejected />} />
              <Route path="/admin/accepted/reqs" element={<AdminAccept />} />
            </Route>
            <Route path="*" element={<Not404 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
