import { useState } from "react";

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>

            <h2>Signup</h2>

            <form>

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