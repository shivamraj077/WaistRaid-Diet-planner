import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-nutrition-green-50 pt-20">
            <div className="container mx-auto px-6 py-20 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 space-y-8">
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight">
                        Eat Smarter, <br /><span className="text-nutrition-green-600">Live Better.</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Achieve your dream physique with <strong>WaistRaid</strong>.
                        AI-powered nutrition planning tailored to your unique body composition and lifestyle goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/register" className="px-8 py-4 bg-nutrition-green-600 text-white rounded-full font-bold text-lg shadow-xl shadow-nutrition-green-500/30 hover:bg-nutrition-green-700 hover:-translate-y-1 transition-all">
                            Start Your Journey
                        </Link>
                        <Link to="/login" className="px-8 py-4 bg-white text-slate-700 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                            Member Login
                        </Link>
                    </div>
                    <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> 100% Free
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> No Credit Card
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Instant Plans
                        </div>
                    </div>
                </div>

                {/* Visual / Image Placeholder */}
                <div className="lg:w-1/2 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-nutrition-green-400 to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                    <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="h-24 bg-green-50 rounded-xl flex items-center justify-center text-green-600 font-bold">Breakfast</div>
                                <div className="h-24 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 font-bold">Lunch</div>
                                <div className="h-24 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">Dinner</div>
                            </div>
                            <div className="h-32 bg-slate-50 rounded-xl mt-4 border border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                                Your Personalized Plan
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
