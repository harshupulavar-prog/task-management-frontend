import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { login: loginUser } = useAuth();


    async function login(e) {

        e.preventDefault();

        setError("");

        try {

            const formData = new URLSearchParams();

            formData.append("username", email);
            formData.append("password", password);

            const response = await api.post(
                "/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            const token = response.data.access_token;

            loginUser(token, email);

            console.log("Login successful");

            navigate("/dashboard");

        } catch (error) {

            console.log(error.response?.data);

            if (error.response) {
                setError("Invalid email or password");
            } else {
                setError("Server is not available");
            }
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>


                <form onSubmit={login}>

                    {/* EMAIL */}

                    <div className="mb-4">

                        <label className="block font-medium mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="mb-5">

                        <label className="block font-medium mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                    >
                        Login
                    </button>

                </form>


                {/* ERROR */}

                {error && (
                    <p className="text-red-500 text-center mt-4">
                        {error}
                    </p>
                )}

            </div>

        </div>
    );
}

export default Login;