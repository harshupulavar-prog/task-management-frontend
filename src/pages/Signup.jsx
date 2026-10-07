import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function signup(e) {
        e.preventDefault();

        try {
            await api.post("/signup", {
                email: email,
                password: password
            });

            navigate("/login");

        } catch (error) {
    console.log("Signup error:", error);
    console.log("Backend response:", error.response?.data);
}
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold">
                    Signup
                </h2>

                <form onSubmit={signup}>
                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="mb-2 block font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;