import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function linkClass({ isActive }) {
    return [
        "inline-flex min-h-10 items-center border-b-2 text-sm font-medium transition-colors",
        isActive
            ? "border-emerald-700 text-slate-950"
            : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-950"
    ].join(" ");
}

function Navbar() {
    const { token, user } = useAuth();
    const { pathname } = useLocation();

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-0 lg:px-8">
                <Link to="/home" className="flex shrink-0 items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-md bg-slate-900 text-xs font-bold tracking-wider text-white">
                        TM
                    </span>
                    <span className="text-sm font-semibold text-slate-950">
                        Task Manager
                    </span>
                </Link>

                <nav
                    aria-label="Main navigation"
                    className="order-3 flex w-full items-center gap-5 border-t border-slate-200 pt-2 sm:order-none sm:w-auto sm:border-0 sm:pt-0"
                >
                    <NavLink to="/home" className={linkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={linkClass}>
                        About
                    </NavLink>
                    {token && (
                        <NavLink to="/dashboard" className={linkClass}>
                            Dashboard
                        </NavLink>
                    )}
                    {token && user?.role === "admin" && (
                        <NavLink to="/admin/users" className={linkClass}>
                            User management
                        </NavLink>
                    )}
                </nav>

                <div className="ml-auto flex shrink-0 items-center gap-4">
                    {!token && pathname !== "/login" && (
                        <NavLink
                            to="/login"
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
                        >
                            Log in
                        </NavLink>
                    )}
                    {!token && pathname !== "/signup" && (
                        <NavLink
                            to="/signup"
                            className="inline-flex min-h-10 items-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                        >
                            Sign up
                        </NavLink>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;