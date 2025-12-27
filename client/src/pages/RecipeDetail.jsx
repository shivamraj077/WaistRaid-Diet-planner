import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockRecipes } from '../data/mockRecipes';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Find recipe from mock data
        const found = mockRecipes.find(r => r._id === id);
        setRecipe(found);
        setLoading(false);

        // Simulating save status check (local storage or just false)
        const savedList = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        setSaved(savedList.includes(id));
    }, [id]);

    const toggleSave = () => {
        const savedList = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        let newList;
        if (saved) {
            newList = savedList.filter(rid => rid !== id);
        } else {
            newList = [...savedList, id];
        }
        localStorage.setItem('savedRecipes', JSON.stringify(newList));
        setSaved(!saved);
    };

    if (loading) return <div className="text-center pt-24">Loading...</div>;
    if (!recipe) return <div className="text-center pt-24">Recipe not found.</div>;

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="rounded-3xl overflow-hidden shadow-2xl relative mb-12">
                    <div className="h-80 md:h-96 w-full bg-slate-200 relative">
                        <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                            <span className="bg-nutrition-green-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                                {recipe.type} • {recipe.goal.replace('_', ' ')}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">{recipe.name}</h1>
                            <div className="flex gap-6 text-sm font-medium opacity-90">
                                <span>⏱ {recipe.time}</span>
                                <span>🔥 {recipe.calories} kcal</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Section */}
                {recipe.videoId && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Watch How to Make It</h2>
                        <div className="aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${recipe.videoId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-[400px]"
                            ></iframe>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Instructions</h2>
                            <div className="space-y-6">
                                {recipe.instructions.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nutrition-green-100 text-nutrition-green-600 flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>
                                        <p className="text-slate-600 leading-relaxed pt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="bg-gray-50 p-8 rounded-3xl sticky top-24">
                            <button
                                onClick={toggleSave}
                                className={`w-full py-4 rounded-xl font-bold text-lg mb-8 transition-all flex items-center justify-center gap-2 ${saved ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-nutrition-green-600 text-white shadow-lg shadow-nutrition-green-500/30 hover:bg-nutrition-green-700'}`}
                            >
                                {saved ? '❤️ Saved' : '🤍 Save Recipe'}
                            </button>

                            <h3 className="text-lg font-bold text-slate-800 mb-4">Ingredients</h3>
                            <ul className="space-y-3">
                                {recipe.ingredients.map((ing, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600 border-b border-gray-200 pb-2 last:border-0">
                                        <span className="w-2 h-2 rounded-full bg-nutrition-green-400"></span>
                                        {ing}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
