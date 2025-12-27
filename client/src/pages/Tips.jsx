const Tips = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Quick Health Tips</h1>
                    <p className="text-slate-500">Simple habits for a healthier lifestyle.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Water */}
                    <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">💧</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Stay Hydrated</h3>
                        <p className="text-slate-600">Drink at least 8 glasses of water a day. Hydration boosts energy and aids digestion.</p>
                    </div>

                    {/* Sleep */}
                    <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl mb-4">😴</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Sleep Well</h3>
                        <p className="text-slate-600">Aim for 7-9 hours of sleep. Quality sleep is essential for recovery and mental clarity.</p>
                    </div>

                    {/* Protein */}
                    <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-4">🍗</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Prioritize Protein</h3>
                        <p className="text-slate-600">Include protein in every meal to maintain muscle mass and keep you feeling full.</p>
                    </div>

                    {/* Veggies */}
                    <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-4">🥦</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Eat Your Greens</h3>
                        <p className="text-slate-600">Fill half your plate with vegetables for essential vitamins, minerals, and fiber.</p>
                    </div>

                    {/* Movement */}
                    <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl mb-4">🏃</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Move Daily</h3>
                        <p className="text-slate-600">Aim for at least 30 minutes of moderate activity each day to boost heart health.</p>
                    </div>

                    {/* Mindful */}
                    <div className="bg-yellow-50 p-8 rounded-2xl border border-yellow-100">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl mb-4">🧘</div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Mindful Eating</h3>
                        <p className="text-slate-600">Eat slowly and without distractions. Listen to your body's hunger and fullness cues.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tips;
