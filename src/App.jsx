import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TaskManager from "./components/taskmanager";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
    return (
        <BrowserRouter>
             <nav>
                <Link to="/Home">Home</Link>{" | "}
                <Link to="/about">About</Link>{" | "}
                <Link to="/login">Login</Link>{" | "}
                <Link to="/signup">Signup</Link>{" | "}
                <Link to="/tasks">Tasks</Link>
                <Link to="/dashboard">Dashboard</Link>
            </nav>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/login" element={<Login />} />


                <Route path="/signup" element={<Signup />} />

                <Route path="/tasks" element={<TaskManager />} />
                 
                  <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


   

export default App;
