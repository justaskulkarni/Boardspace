import { BrowserRouter, Routes, Route} from 'react-router-dom';

//utils
import MentorPrivateRoutes from './utils/MentorPrivateRoutes';
import StudentPrivateRoutes from './utils/StudentPrivateRoutes';

// pages & components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Protected from './pages/Protected';
import Signup2 from './pages/Signup2';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import ProtectedStudent from './pages/ProtectedStudent';

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
          <Route element={<MentorPrivateRoutes />}>
            <Route path="/youin" element={<Protected />} />
          </Route>
          <Route element={<StudentPrivateRoutes />}>
            <Route path="/studentin" element={<ProtectedStudent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

