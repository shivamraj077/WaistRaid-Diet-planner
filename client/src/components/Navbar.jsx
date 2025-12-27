import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-nutrition-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2c0 3.3-2.7 6-6 6s-6-2.7-6-6V2zm0 18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2c0-3.3-2.7-6-6-6s-6 2.7-6 6v2z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">WaistRaid</span>
                </Link>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-slate-600 hover:text-nutrition-green-600 font-medium transition-colors">Dashboard</Link>
                            <Link to="/recipes" className="text-slate-600 hover:text-nutrition-green-600 font-medium transition-colors">Recipes</Link>
                            <Link to="/history" className="text-slate-600 hover:text-nutrition-green-600 font-medium transition-colors">History</Link>
                            <Link to="/blog" className="text-slate-600 hover:text-nutrition-green-600 font-medium transition-colors">Blog</Link>
                            <Link to="/about" className="text-slate-600 hover:text-nutrition-green-600 font-medium transition-colors">About</Link>
                            <Link to="/contact" className="text-slate-600 hover:text-nutrition-green-600 font-medium transition-colors">Contact</Link>
                            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                                <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                                <button onClick={logout} className="text-sm text-red-500 hover:text-red-600 font-medium">Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/about" className="text-slate-600 hover:text-nutrition-green-600 font-medium transition-colors">About</Link>
                            <Link to="/blog" className="text-slate-600 hover:text-nutrition-green-600 font-medium transition-colors">Blog</Link>
                            <Link to="/login" className="text-slate-600 hover:text-nutrition-green-600 font-medium transition-colors">Sign In</Link>
                            <Link to="/register" className="bg-nutrition-green-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-nutrition-green-700 shadow-lg shadow-nutrition-green-500/30 transition-all hover:-translate-y-0.5">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
