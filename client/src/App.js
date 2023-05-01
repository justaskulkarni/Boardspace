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
import PostPostStudent from "./pages/PostPostStudent";
import AdminLand from "./pages/AdminLand";
import Notaccepted from "./pages/Notaccepted";
import Not404 from "./pages/404";
import AdminRejected from "./pages/AdminRejected";
import AdminAccept from "./pages/AdminAccept";
import Chat from "./pages/Chat";
import MentorChat from "./pages/MentorChat";
import AdminMentorMessages from "./pages/AdminMentorMessages";
import AdminStudentChat from "./pages/AdminStudentChat";
import AdminMentorChat from "./pages/AdminMentorChat";
import AdminStudentMessages from "./pages/AdminStudentMessages";
import AdminChatRooms from "./pages/AdminChatRooms";
import PostViewStudent from "./pages/PostViewStudent"

import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:6100";
const socket = io(SOCKET_URL);

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
            <Route path="/notaccepted" element={<Notaccepted />} />
            <Route element={<MentorPrivateRoutes />}>
              <Route path="/youin" element={<Protected />} />
              <Route path="/mentor/chat" element={<MentorChat socket = {socket}/>} />
            </Route>
            <Route element={<StudentPrivateRoutes />}>
              <Route path="/student/post" element={<PostPostStudent />} />
              <Route path="/student/chat" element={<Chat socket = {socket}/>} />
              <Route path="/student/view/:findhashtag" element={<PostViewStudent />} />
              <Route path="/student/view" element={<PostViewStudent />} />
            </Route>
            <Route element={<AdminPrivateRoutes />}>
              <Route path="/admin/landing" element={<AdminLand />} />
              <Route path="/admin/rejected/reqs" element={<AdminRejected />} />
              <Route path="/admin/accepted/reqs" element={<AdminAccept />} />
              <Route path="/admin/messages" element={<AdminMentorMessages />} />
              <Route path="/admin-student/messages" element={<AdminStudentMessages />} />
              <Route path="/mentor/chat/:id" element={<AdminMentorChat socket = {socket}/>} />
              <Route path="/student/chat/:id" element={<AdminStudentChat socket = {socket}/>} />
              <Route path="/admin/chatrooms" element={<AdminChatRooms socket = {socket}/>} />
            </Route>
            <Route path="*" element={<Not404 />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
