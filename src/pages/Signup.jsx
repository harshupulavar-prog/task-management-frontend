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
        <div>

            <h2>Signup</h2>

            <form onSubmit={signup}>

                <div>
                    <label>Email</label>
                    <br />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Signup
                </button>

            </form>

        </div>
    );
}

export default Signup;