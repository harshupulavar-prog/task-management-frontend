import { useEffect, useState } from "react";
import api from "../api/api";

function AdminUsers() {
    const [inviteEmail, setInviteEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [savingId, setSavingId] = useState(null);
    const [sendingInvite, setSendingInvite] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await api.get("/admin/users");
                setUsers(response.data);
            } catch (requestError) {
                setError(
                    requestError.response?.data?.detail ||
                    "Could not load users."
                );
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, []);

    function changeRole(userId, role) {
        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === userId ? { ...user, role } : user
            )
        );
    }

    async function sendAdminInvite(event) {
        event.preventDefault();
        setError("");
        setNotice("");
        setSendingInvite(true);

        try {
            const response = await api.post("/admin/signup", {
                email: inviteEmail
            });
            setNotice(response.data.message);
            setInviteEmail("");
        } catch (requestError) {
            setError(
                requestError.response?.data?.detail ||
                "Could not send the admin invitation."
            );
        } finally {
            setSendingInvite(false);
        }
    }

    async function saveRole(user) {
        setError("");
        setNotice("");
        setSavingId(user.id);

        try {
            const response = await api.patch(
                `/admin/users/${user.id}/role`,
                { role: user.role }
            );
            setUsers((currentUsers) =>
                currentUsers.map((currentUser) =>
                    currentUser.id === user.id ? response.data : currentUser
                )
            );
            setNotice(`Updated access for ${user.email}.`);
        } catch (requestError) {
            setError(
                requestError.response?.data?.detail ||
                "Could not update the user's role."
            );
        } finally {
            setSavingId(null);
        }
    }

    return (
        <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-950">User management</h1>
            <p className="mt-2 text-slate-600">
                Assign admin access only to trusted accounts.
            </p>

            <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-semibold text-slate-950">
                    Invite an admin
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                    The recipient will verify their email and choose their own password.
                </p>
                <form onSubmit={sendAdminInvite} className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <label className="sr-only" htmlFor="admin-invite-email">
                        Email address to invite
                    </label>
                    <input
                        id="admin-invite-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={inviteEmail}
                        onChange={(event) => setInviteEmail(event.target.value)}
                        placeholder="admin@example.com"
                        className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2.5"
                    />
                    <button
                        type="submit"
                        disabled={sendingInvite}
                        className="rounded-md bg-emerald-700 px-4 py-2.5 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {sendingInvite ? "Sending..." : "Send admin invitation"}
                    </button>
                </form>
            </section>

            {notice && (
                <p className="mt-5 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800" role="status">
                    {notice}
                </p>
            )}
            {error && (
                <p className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">
                    {error}
                </p>
            )}

            <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
                {loading ? (
                    <p className="p-6 text-sm text-slate-600">Loading users...</p>
                ) : (
                    <table className="w-full min-w-[36rem] text-left text-sm">
                        <thead className="bg-slate-100 text-slate-700">
                            <tr>
                                <th scope="col" className="px-5 py-3 font-semibold">Email</th>
                                <th scope="col" className="px-5 py-3 font-semibold">Phone</th>
                                <th scope="col" className="px-5 py-3 font-semibold">Role</th>
                                <th scope="col" className="px-5 py-3 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-5 py-4 font-medium text-slate-950">{user.email}</td>
                                    <td className="px-5 py-4 text-slate-600">{user.phone || "—"}</td>
                                    <td className="px-5 py-4">
                                        <label className="sr-only" htmlFor={`role-${user.id}`}>
                                            Role for {user.email}
                                        </label>
                                        <select
                                            id={`role-${user.id}`}
                                            value={user.role}
                                            onChange={(event) => changeRole(user.id, event.target.value)}
                                            className="rounded-md border border-slate-300 px-3 py-2"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-5 py-4">
                                        <button
                                            type="button"
                                            disabled={savingId === user.id}
                                            onClick={() => saveRole(user)}
                                            className="rounded-md bg-slate-900 px-3 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-60"
                                        >
                                            {savingId === user.id ? "Saving..." : "Save"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-5 py-6 text-center text-slate-600">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}

export default AdminUsers;
