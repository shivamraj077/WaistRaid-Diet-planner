import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Health & Nutrition Blog</h1>
                    <p className="text-slate-500">Latest tips, research, and guides for a healthier you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-nutrition-green-600 bg-nutrition-green-50 px-2 py-1 rounded-full uppercase">{post.category}</span>
                                    <span className="text-xs text-slate-400">{post.date}</span>
                                </div>
                                <h2 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-nutrition-green-600 transition-colors">{post.title}</h2>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                                <Link to={`/blog/${post.id}`} className="text-slate-800 font-bold text-sm hover:underline mt-auto inline-block">Read Article →</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;


