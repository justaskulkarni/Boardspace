import { BrowserRouter, Routes, Route} from 'react-router-dom';

// pages & components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Protected from './pages/Protected';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/youin" element={<Protected />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

