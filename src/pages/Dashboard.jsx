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
        <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-lg mx-auto">

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Task Manager</h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                >
                    Logout
                </button>
            </div>

            <TaskManager />

        </div>
    </div>
);
}

export default Dashboard;