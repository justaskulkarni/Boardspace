import { BrowserRouter, Routes, Route} from 'react-router-dom';

//utils
import MentorPrivateRoutes from './utils/MentorPrivateRoutes';
import StudentPrivateRoutes from './utils/StudentPrivateRoutes';
import AdminPrivateRoutes from './utils/AdminPrivateRoutes';

// pages & components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Protected from './pages/Protected';
import Signup2 from './pages/Signup2';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import StudentSignup from './pages/StudentSignup';
import AdminSignup from './pages/AdminSignup';
import ProtectedStudent from './pages/ProtectedStudent';
import ProtectedAdmin from './pages/ProtectedAdmin';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/complete_details" element={<Signup2 />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route element={<MentorPrivateRoutes />}>
            <Route path="/youin" element={<Protected />} />
          </Route>
          <Route element={<StudentPrivateRoutes />}>
            <Route path="/studentin" element={<ProtectedStudent />} />
          </Route>
          <Route element={<StudentPrivateRoutes />}>
            <Route path="/studentin" element={<ProtectedStudent />} />
          </Route>
          <Route element={<AdminPrivateRoutes />}>
            <Route path="/adminin" element={<ProtectedAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

