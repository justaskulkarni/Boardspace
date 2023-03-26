import { BrowserRouter, Routes, Route} from 'react-router-dom';

// pages & components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Protected from './pages/Protected';
import MentorPrivateRoutes from './utils/MentorPrivateRoutes';
import Signup2 from './pages/Signup2';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complete_details" element={<Signup2 />} />
          <Route element={<MentorPrivateRoutes />}>
            <Route path="/youin" element={<Protected />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

