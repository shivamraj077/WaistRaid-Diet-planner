import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SavedRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedRecipes();
    }, []);

    const fetchSavedRecipes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/recipes/user/saved', { withCredentials: true });
            setRecipes(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">My Saved Recipes</h1>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.length > 0 ? (
                            recipes.map(recipe => (
                                <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col overflow-hidden">
                                    <div className="h-40 bg-gray-200">
                                        <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4 flex-grow">
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">{recipe.name}</h3>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">{recipe.type} • {recipe.calories} kcal</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p className="text-slate-400 mb-4">You haven't saved any recipes yet.</p>
                                <Link to="/recipes" className="text-nutrition-green-600 font-bold hover:underline">Browse Recipes</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedRecipes;
