import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const notice = location.state?.message || "";
    const navigate = useNavigate();
    const { login: loginUser } = useAuth();

    async function login(event) {
        event.preventDefault();
        setError("");

        try {
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);

            const response = await api.post("/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            const user = response.data.user || {
                email,
                role: "user"
            };
            loginUser(response.data.access_token, user);
            navigate("/dashboard");
        } catch (requestError) {
            setError(
                requestError.response?.data?.detail ||
                (requestError.response
                    ? "Invalid email or password"
                    : "Server is not available")
            );
        }
    }

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 p-4">
            <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-center text-2xl font-bold text-slate-950">
                    Welcome back
                </h1>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Log in to manage your tasks.
                </p>

                {notice && (
                    <p className="mt-5 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800" role="status">
                        {notice}
                    </p>
                )}

                <form onSubmit={login} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5"
                        />
                    </div>

                    <div>
                        <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-700" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-md bg-emerald-700 px-4 py-2.5 font-semibold text-white hover:bg-emerald-800"
                    >
                        Log in
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    New to Task Manager?{" "}
                    <Link to="/signup" className="font-semibold text-emerald-800 hover:underline">
                        Create a new account
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Login;
