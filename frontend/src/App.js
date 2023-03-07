
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import  {BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import NavBar from './components/NavBar';
import PostOverview from './pages/PostOverview';
import Profile from './pages/Profile';

function App() {
  return (
    <div className='app-bg'>
    <Router>
    <NavBar/>
    {/* <Login/>*/}
   <Routes>
   <Route exact path="/" element={<Login/>} />
   <Route exact path="/login" element={<Login/>}  />
   <Route exact path="/signup" element={<Signup/>}  />
   <Route exact path="/posts" element={<PostOverview/>}  />
   <Route exact path="/myprofile" element={<Profile/>}  />
   </Routes>
   
   </Router>
   </div> 
  );
}

export default App;
