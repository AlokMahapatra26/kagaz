import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Write from './pages/Write'
import Profile from "./pages/Profile"


function App() {
  

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<Signin/>}/>
          <Route path="/sign-up" element={<Signup/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/write" element={<Write/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
