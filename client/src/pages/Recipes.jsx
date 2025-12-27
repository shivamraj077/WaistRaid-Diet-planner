import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { mockRecipes } from '../data/mockRecipes';

const Recipes = () => {
    const [recipes, setRecipes] = useState(mockRecipes);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        type: 'all',
        goal: 'all',
        search: ''
    });

    useEffect(() => {
        // Filter logic on frontend
        let result = mockRecipes;

        if (filters.type !== 'all') {
            result = result.filter(r => r.type === filters.type);
        }
        if (filters.goal !== 'all') {
            result = result.filter(r => r.goal === filters.goal);
        }
        if (filters.search) {
            result = result.filter(r => r.name.toLowerCase().includes(filters.search.toLowerCase()));
        }

        setRecipes(result);
    }, [filters.type, filters.goal, filters.search]);

    /* API Call commented out for now as per user request
    const fetchRecipes = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await axios.get(`http://localhost:5000/api/recipes?${query}`, { withCredentials: true });
            setRecipes(res.data);
        } catch (error) {
            console.error('Error fetching recipes', error);
        } finally {
            setLoading(false);
        }
    };
    */

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Color helpers
    const typeColors = {
        breakfast: 'bg-orange-100 text-orange-600',
        lunch: 'bg-green-100 text-green-600',
        dinner: 'bg-blue-100 text-blue-600'
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-800">Healthy Recipes</h1>
                        <p className="text-slate-500 mt-2">Discover meals tailored to your goals.</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search recipes..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrition-green-200"
                        />
                        <select name="type" onChange={handleFilterChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrition-green-200 bg-white">
                            <option value="all">All Meals</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                        <select name="goal" onChange={handleFilterChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrition-green-200 bg-white">
                            <option value="all">All Goals</option>
                            <option value="weight_loss">Weight Loss</option>
                            <option value="weight_gain">Weight Gain</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.map(recipe => (
                            <div key={recipe._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                <div className="h-48 overflow-hidden relative bg-gray-200">
                                    {/* Placeholder or actual image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                    <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <span className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${typeColors[recipe.type] || 'bg-gray-100'}`}>
                                        {recipe.type}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{recipe.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                        <span>🔥 {recipe.calories} kcal</span>
                                        <span>⏱ {recipe.time}</span>
                                    </div>
                                    <Link to={`/recipes/${recipe._id}`} className="block w-full text-center py-3 rounded-lg border-2 border-slate-100 font-bold text-slate-600 hover:border-nutrition-green-600 hover:text-nutrition-green-600 transition-colors">
                                        View Recipe
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && recipes.length === 0 && (
                    <div className="text-center py-20 text-slate-400">
                        <p className="text-xl">No recipes found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recipes;
