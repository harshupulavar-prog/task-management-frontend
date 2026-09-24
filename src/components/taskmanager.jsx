import { useEffect, useState } from "react";
import api from "../api/api";

function TaskManager() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(0);

    const limit = 5;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);


    // GET TASKS

    async function getTasks() {

        setLoading(true);

        try {

            let url = `/tasks?skip=${page * limit}&limit=${limit}`;

            if (filter === "active") {
                url = `/tasks?completed=false&skip=${page * limit}&limit=${limit}`;
            }

            if (filter === "completed") {
                url = `/tasks?completed=true&skip=${page * limit}&limit=${limit}`;
            }

            const response = await api.get(url);

            setTasks(response.data);

        } catch (error) {

            console.log(
                "Error getting tasks:",
                error.response?.data
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {
        getTasks();
    }, [filter, page]);


    // CHANGE FILTER

    function changeFilter(newFilter) {
        setFilter(newFilter);
        setPage(0);
    }


    // ADD TASK

    async function addTask() {

        if (title === "" || description === "") {
            return;
        }

        try {

            const response = await api.post("/tasks", {
                title: title,
                description: description
            });

            setTasks([...tasks, response.data]);

            setTitle("");
            setDescription("");

        } catch (error) {

            console.log(
                "Error adding task:",
                error.response?.data
            );
        }
    }


    // DELETE TASK

    async function removeTask(id) {

        try {

            await api.delete(`/tasks/${id}`);

            setTasks(
                tasks.filter(task => task.id !== id)
            );

        } catch (error) {

            console.log(
                "Error deleting task:",
                error.response?.data
            );
        }
    }


    // START EDIT

    function startEdit(task) {

        setEditingId(task.id);
        setTitle(task.title);
        setDescription(task.description);
    }


    // UPDATE TASK

    async function updateTask() {

        try {

            const response = await api.put(
                `/tasks/${editingId}`,
                {
                    title: title,
                    description: description,
                    completed: false
                }
            );

            setTasks(
                tasks.map(task =>
                    task.id === editingId
                        ? response.data
                        : task
                )
            );

            setEditingId(null);
            setTitle("");
            setDescription("");

        } catch (error) {

            console.log(
                "Error updating task:",
                error.response?.data
            );
        }
    }


    return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md">
       

            <h1>Task Manager</h1>
                {/* PAGE TITLE */}

                <h1 className="text-3xl font-bold text-center mb-8">
                    Task Manager
                </h1>


                {/* TASK FORM */}

                <div className="bg-white p-6 rounded-lg shadow-md mb-8">

                    <h2 className="text-xl font-semibold mb-4">
                        {editingId === null
                            ? "Add New Task"
                            : "Edit Task"}
                    </h2>


                    <input
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                    />


                    <input
                        type="text"
                        placeholder="Enter task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                    />


                    {editingId === null ? (

                        <button
                            onClick={addTask}
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                        >
                            Add Task
                        </button>

                    ) : (

                        <button
                            onClick={updateTask}
                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
                        >
                            Update Task
                        </button>

                    )}

                </div>


                {/* TASK SECTION */}

                <div className="bg-white p-6 rounded-lg shadow-md">

                    <h2 className="text-xl font-semibold mb-4">
                        My Tasks
                    </h2>


                    {/* FILTER BUTTONS */}

                    <div className="flex flex-wrap gap-2 mb-6">

                        <button
                            onClick={() => changeFilter("all")}
                            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white"
                        >
                            All
                        </button>


                        <button
                            onClick={() => changeFilter("active")}
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                        >
                            Active
                        </button>


                        <button
                            onClick={() => changeFilter("completed")}
                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
                        >
                            Completed
                        </button>

                    </div>


                    {/* LOADING */}

                    {loading && (
                        <p className="text-gray-500 mb-4">
                            Loading tasks...
                        </p>
                    )}


                    {/* TASK LIST */}

                    <div className="space-y-3">

                        {tasks.map(task => (

                            <div
                                key={task.id}
                                className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                            >

                                <div>

                                    <h3 className="font-semibold text-lg">
                                        {task.title}
                                    </h3>

                                    <p className="text-gray-600">
                                        {task.description}
                                    </p>

                                </div>


                                <div className="flex gap-2">

                                    <button
                                        onClick={() => startEdit(task)}
                                        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() => removeTask(task.id)}
                                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* PAGINATION */}

                    <div className="flex items-center justify-center gap-4 mt-6">

                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                            className="bg-gray-500 disabled:bg-gray-300 px-4 py-2 rounded text-white"
                        >
                            Previous
                        </button>


                        <span className="font-semibold">
                            Page {page + 1}
                        </span>


                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={tasks.length < limit}
                            className="bg-gray-500 disabled:bg-gray-300 px-4 py-2 rounded text-white"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>
        </div>

    
    );
}

export default TaskManager;