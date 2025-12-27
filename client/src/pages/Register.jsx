import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/health-profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Create Account" subtitle="Join thousands of healthy users today">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">⚠️ {error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-nutrition-green-500 focus:ring-2 focus:ring-nutrition-green-100 outline-none transition-all"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-nutrition-green-500 focus:ring-2 focus:ring-nutrition-green-100 outline-none transition-all"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-nutrition-green-500 focus:ring-2 focus:ring-nutrition-green-100 outline-none transition-all"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-nutrition-green-600 text-white py-3 rounded-lg font-semibold hover:bg-nutrition-green-700 transition-colors shadow-lg shadow-nutrition-green-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
            <p className="mt-8 text-center text-sm text-slate-500">
                Already have an account? <Link to="/login" className="text-nutrition-green-600 font-semibold hover:underline">Sign in</Link>
            </p>
        </AuthLayout>
    );
};

export default Register;
