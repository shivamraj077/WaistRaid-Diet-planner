import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Post Not Found</h1>
                <Link to="/blog" className="text-nutrition-green-600 hover:underline">← Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-nutrition-green-600 mb-8 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Articles
                </Link>

                <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-64 md:h-96 w-full relative">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <div>
                                <span className="text-xs font-bold text-white bg-nutrition-green-600 px-3 py-1 rounded-full uppercase mb-3 inline-block shadow-lg">
                                    {post.category}
                                </span>
                                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight shadow-sm">
                                    {post.title}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex items-center text-slate-400 text-sm mb-8 pb-8 border-b border-gray-100">
                            <span>Published on {post.date}</span>
                            <span className="mx-2">•</span>
                            <span>{Math.ceil(post.content.length / 500)} min read</span>
                        </div>

                        <div
                            className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-img:rounded-2xl prose-a:text-nutrition-green-600"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogPost;
