import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api";

function AdminSignupComplete() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    async function completeSignup(event) {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await api.post("/admin/signup/verify", {
                email,
                code,
                password
            });
            navigate("/login", {
                state: { message: "Admin account created. You can now log in." }
            });
        } catch (requestError) {
            setError(
                requestError.response?.data?.detail ||
                "Could not complete admin account setup."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 p-4">
            <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-center text-2xl font-bold text-slate-950">
                    Complete admin setup
                </h1>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Verify the invitation sent to your email and choose a password.
                </p>

                <form onSubmit={completeSignup} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="admin-signup-email" className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            id="admin-signup-email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5"
                        />
                    </div>

                    <div>
                        <label htmlFor="admin-signup-code" className="mb-2 block text-sm font-medium text-slate-700">
                            Email verification code
                        </label>
                        <input
                            id="admin-signup-code"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="[0-9]{6}"
                            maxLength={6}
                            required
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            className="w-full rounded-md border border-slate-300 px-3 py-2.5 tracking-[0.3em]"
                        />
                    </div>

                    <div>
                        <label htmlFor="admin-signup-password" className="mb-2 block text-sm font-medium text-slate-700">
                            Choose a password
                        </label>
                        <input
                            id="admin-signup-password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
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
                        disabled={submitting}
                        className="w-full rounded-md bg-emerald-700 px-4 py-2.5 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Verifying..." : "Verify and create admin account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-emerald-800 hover:underline">
                        Log in
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default AdminSignupComplete;
