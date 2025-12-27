import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const HealthForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isUpdate = location.state?.isUpdate;
    const initialProfileName = location.state?.profileName || (location.state?.isNew ? '' : 'Me');

    const [formData, setFormData] = useState({
        profileName: initialProfileName,
        age: '',
        gender: 'male',
        height: '',
        weight: '',
        activityLevel: 'sedentary',
        goal: 'maintenance'
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isUpdate && initialProfileName) {
            const fetchProfile = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/health?profileName=${initialProfileName}`, { withCredentials: true });
                    if (res.data) {
                        setFormData(prev => ({ ...prev, ...res.data }));
                    }
                } catch (err) {
                    console.error('Error fetching profile for update', err);
                }
            };
            fetchProfile();
        }
    }, [isUpdate, initialProfileName]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/health', formData, { withCredentials: true });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving profile', error);
            setError('Error saving profile. Please try again.');
        }
    };

    // Calculate BMI for preview
    const calculateBMI = () => {
        const heightM = formData.height / 100;
        if (heightM > 0 && formData.weight > 0) {
            return (formData.weight / (heightM * heightM)).toFixed(1);
        }
        return null;
    };

    const currentBMI = calculateBMI();

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex items-center justify-center">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-2xl border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Update Your Profile</h2>
                    <p className="text-slate-500">Let's tailor your plan to your body.</p>
                </div>

                {/* Visual BMI Indicator */}
                <div className="mb-10 bg-slate-50 p-6 rounded-2xl border border-gray-200">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Estimated BMI</span>
                        <span className="text-3xl font-extrabold text-slate-800">{currentBMI || '--'}</span>
                    </div>
                    {/* Bar */}
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden relative">
                        {/* Zones */}
                        <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-blue-300 opacity-30"></div>
                        <div className="absolute top-0 bottom-0 left-1/3 w-1/3 bg-green-300 opacity-30"></div>
                        <div className="absolute top-0 bottom-0 right-0 w-1/3 bg-orange-300 opacity-30"></div>

                        {/* Marker */}
                        {currentBMI && (
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-slate-800 transition-all duration-500"
                                style={{
                                    left: `${Math.min(Math.max((currentBMI - 10) * 3, 0), 100)}%`
                                }}
                            ></div>
                        )}
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                        <span>Underweight</span>
                        <span>Normal</span>
                        <span>Overweight</span>
                    </div>
                </div>

                {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-bold text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Name */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Profile Name (e.g., Me, Dad, Mom)</label>
                        <input type="text" name="profileName" value={formData.profileName} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nutrition-green-500 focus:bg-white transition-all font-bold text-slate-700" placeholder="Me" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Age</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nutrition-green-500 focus:bg-white transition-all font-bold text-slate-700" placeholder="25" required />
                        </div>
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Height (cm)</label>
                            <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nutrition-green-500 focus:bg-white transition-all font-bold text-slate-700" placeholder="175" required />
                        </div>
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Weight (kg)</label>
                            <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nutrition-green-500 focus:bg-white transition-all font-bold text-slate-700" placeholder="70" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gender</label>
                        <div className="flex gap-4">
                            {['male', 'female'].map(g => (
                                <label key={g} className={`flex-1 cursor-pointer py-4 rounded-xl text-center font-bold transition-all border-2 ${formData.gender === g ? 'border-nutrition-green-500 bg-nutrition-green-50 text-nutrition-green-700' : 'border-gray-100 bg-white text-slate-400 hover:border-gray-200'}`}>
                                    <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="hidden" />
                                    {g === 'male' ? '👨 Male' : '👩 Female'}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Activity Level</label>
                            <div className="relative">
                                <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nutrition-green-500 focus:bg-white transition-all font-bold text-slate-700 appearance-none cursor-pointer">
                                    <option value="sedentary">🛋️ Sedentary (Little to no exercise)</option>
                                    <option value="lightly_active">🚶 Lightly Active (Light exercise 1-3 days/week)</option>
                                    <option value="moderately_active">🏃 Moderately Active (Moderate exercise 3-5 days/week)</option>
                                    <option value="very_active">🏋️ Very Active (Hard exercise 6-7 days/week)</option>
                                    <option value="extra_active">🔥 Extra Active (Very hard exercise & physical job)</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Health Goal</label>
                            <div className="relative">
                                <select name="goal" value={formData.goal} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nutrition-green-500 focus:bg-white transition-all font-bold text-slate-700 appearance-none cursor-pointer">
                                    <option value="weight_loss">📉 Lose Weight</option>
                                    <option value="maintenance">⚖️ Maintain Weight</option>
                                    <option value="weight_gain">📈 Gain Weight</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-nutrition-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-nutrition-green-700 shadow-xl shadow-nutrition-green-500/30 transition-all hover:-translate-y-1 mt-4">
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HealthForm;
