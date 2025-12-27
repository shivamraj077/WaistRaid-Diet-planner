import { useState } from 'react';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate sending
        setTimeout(() => {
            setStatus('sent');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Get In Touch</h1>
                    <p className="text-slate-500">Have questions or feedback? We'd love to hear from you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-50 rounded-3xl p-8 md:p-12">
                    {/* Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Email Us</h3>
                            <p className="text-slate-600">contact@dietplanner.com</p>
                            <p className="text-slate-600">support@dietplanner.com</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Office Location</h3>
                            <p className="text-slate-600">
                                123 Health Street,<br />
                                Wellness City, WC 12345
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors shadow-sm">In</a>
                                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-pink-600 transition-colors shadow-sm">Ig</a>
                                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors shadow-sm">Tw</a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        {status === 'sent' ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl mx-auto mb-4">✓</div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                                <p className="text-slate-500">We'll get back to you shortly.</p>
                                <button onClick={() => setStatus('')} className="mt-6 text-nutrition-green-600 font-bold hover:underline">Send another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nutrition-green-500" required placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nutrition-green-500" required placeholder="you@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                                    <textarea rows="4" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nutrition-green-500" required placeholder="How can we help?"></textarea>
                                </div>
                                <button type="submit" disabled={status === 'sending'} className="w-full bg-nutrition-green-600 text-white py-3 rounded-lg font-bold hover:bg-nutrition-green-700 transition-colors disabled:opacity-50">
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
