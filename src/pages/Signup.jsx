import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState("details");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    

    async function requestCode(event) {
        event.preventDefault();
        setError("");
        setNotice("");
        setSubmitting(true);

        try {
            const response = await api.post("/signup", {
                email,
                password
            });
            setStep("verify");
            setNotice(response.data.message);
        } catch (requestError) {
            setError(
                requestError.response?.data?.detail ||
                "Could not send the verification code. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    }

    async function verifyCode(event) {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await api.post("/signup/verify", { email, code });
            navigate("/login", {
                state: { message: "Account created. You can now log in." }
            });
        } catch (requestError) {
            setError(
                requestError.response?.data?.detail ||
                "Could not verify the code. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 p-4">
            <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-center text-2xl font-bold text-slate-950">
                    Create your account
                </h1>
                <p className="mt-2 text-center text-sm text-slate-600">
                    {step === "details"
                        ? "Verify your email address to get started."
                        : `Enter the six-digit code sent to ${email}.`}
                </p>

                {notice && (
                    <p className="mt-5 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800" role="status">
                        {notice}
                    </p>
                )}

                {step === "details" ? (
                    <form onSubmit={requestCode} className="mt-6 space-y-5">
                        <div>
                            <label htmlFor="signup-email" className="mb-2 block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input
                                id="signup-email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full rounded-md border border-slate-300 px-3 py-2.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="signup-password" className="mb-2 block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <input
                                id="signup-password"
                                type="password"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="w-full rounded-md border border-slate-300 px-3 py-2.5"
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                Use at least 8 characters.
                            </p>
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
                            {submitting ? "Sending code..." : "Send verification code"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={verifyCode} className="mt-6 space-y-5">
                        <div>
                            <label htmlFor="signup-code" className="mb-2 block text-sm font-medium text-slate-700">
                                Verification code
                            </label>
                            <input
                                id="signup-code"
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
                            {submitting ? "Verifying..." : "Verify and create account"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setStep("details");
                                setNotice("");
                                setError("");
                            }}
                            className="w-full text-sm font-medium text-slate-600 hover:text-slate-950"
                        >
                            Change signup details
                        </button>
                    </form>
                )}

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

export default Signup;
