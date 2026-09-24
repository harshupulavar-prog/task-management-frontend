import { useNavigate } from "react-router-dom";
import TaskManager from "../components/taskmanager";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const navigate = useNavigate();

      const { logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <button onClick={logout}>
                Logout
            </button>

            <TaskManager />
        </div>
    );
}

export default Dashboard;