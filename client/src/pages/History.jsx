import { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profilesList, setProfilesList] = useState(['Me']);
    const [currentProfile, setCurrentProfile] = useState('Me');

    useEffect(() => {
        // Fetch list of profiles on mount
        const fetchProfiles = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/health/profiles', {
                    withCredentials: true,
                    headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
                });
                if (res.data.length > 0) {
                    setProfilesList(res.data);
                    setCurrentProfile(res.data[0]);
                }
            } catch (error) {
                console.error('Error fetching profiles', error);
            }
        };
        fetchProfiles();
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!currentProfile) return;
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/diet?profileName=${currentProfile}`, { withCredentials: true });
                setPlans(res.data);
            } catch (error) {
                console.error(error);
                setPlans([]);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [currentProfile]);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Your Plan History</h1>
                    <select
                        value={currentProfile}
                        onChange={(e) => setCurrentProfile(e.target.value)}
                        className="bg-white border border-gray-200 text-slate-700 font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-nutrition-green-500 cursor-pointer shadow-sm"
                    >
                        {profilesList.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="space-y-6">
                        {plans.length > 0 ? (
                            plans.map((plan) => (
                                <div key={plan._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">{new Date(plan.dateGenerated).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                                        <p className="text-sm text-slate-500">
                                            BMI: <span className="font-semibold text-slate-700">{plan.bmi}</span> •
                                            Calories: <span className="font-semibold text-slate-700">{plan.dailyCalories} kcal</span>
                                        </p>
                                    </div>
                                    <div className="flex gap-4 text-sm w-full md:w-auto">
                                        <div className="bg-orange-50 px-4 py-2 rounded-lg text-orange-700 flex-1 md:flex-none">
                                            <span className="block text-xs font-bold opacity-70 mb-1">BREAKFAST</span>
                                            <div className="font-semibold truncate w-32">{typeof plan.plan.breakfast === 'string' ? plan.plan.breakfast : plan.plan.breakfast.title}</div>
                                        </div>
                                        <div className="bg-green-50 px-4 py-2 rounded-lg text-green-700 flex-1 md:flex-none">
                                            <span className="block text-xs font-bold opacity-70 mb-1">LUNCH</span>
                                            <div className="font-semibold truncate w-32">{typeof plan.plan.lunch === 'string' ? plan.plan.lunch : plan.plan.lunch.title}</div>
                                        </div>
                                        <div className="bg-blue-50 px-4 py-2 rounded-lg text-blue-700 flex-1 md:flex-none">
                                            <span className="block text-xs font-bold opacity-70 mb-1">DINNER</span>
                                            <div className="font-semibold truncate w-32">{typeof plan.plan.dinner === 'string' ? plan.plan.dinner : plan.plan.dinner.title}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-slate-400 py-12">No history found. Generate your first plan!</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
