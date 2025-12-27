import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthForm from './pages/HealthForm';
import ProtectedRoute from './components/ProtectedRoute';

import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import SavedRecipes from './pages/SavedRecipes';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Tips from './pages/Tips';
import History from './pages/History';

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/tips" element={<Tips />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/health-profile" element={<HealthForm />} />
                        <Route path="/recipes" element={<Recipes />} />
                        <Route path="/recipes/:id" element={<RecipeDetail />} />
                        <Route path="/saved-recipes" element={<SavedRecipes />} />
                        <Route path="/history" element={<History />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}
export default App;
