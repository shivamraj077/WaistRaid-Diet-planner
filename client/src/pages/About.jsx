import { Link } from 'react-router-dom';

const About = () => {
    const teamMembers = [
        {
            name: 'Meena',
            role: 'Lead Developer',
            desc: 'Full Stack Developer passionate about health tech and AI integration.',
            socials: {
                linkedin: '#',
                github: '#',
                twitter: '#'
            }
        },
        // Add more team members as needed
    ];

    const features = [
        {
            title: "Smart Diet Planning",
            desc: "AI-driven algorithms that calculate your exact nutritional needs based on BMI, BMR, and goals.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        },
        {
            title: "Multi-Profile Management",
            desc: "Manage health profiles for your entire family from a single account. Switch contexts instantly.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            title: "Recipe Library",
            desc: "Access a vast collection of healthy recipes with detailed macro-nutrient breakdowns.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            title: "Progress Tracking",
            desc: "Visualize your weight loss journey and bmi changes over time with interactive charts.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-6xl">

                {/* Hero Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">About WaistRaid</h1>
                    <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                        WaistRaid isn't just a calorie counter. It's an intelligent nutrition assistant that simplifies healthy living specifically for you and your loved ones.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-all">
                            <div className="w-16 h-16 rounded-2xl bg-nutrition-green-50 text-nutrition-green-600 flex items-center justify-center flex-shrink-0">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mission & Contact Split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Mission */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-white/80 text-lg leading-relaxed mb-8">
                            We believe that good nutrition shouldn't be complicated. By combining nutritional science with modern technology, we aim to make personalized health accessible to everyone, regardless of their starting point.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-white/10 p-4 rounded-xl text-center">
                                <span className="block text-2xl font-bold">100+</span>
                                <span className="text-sm opacity-70">Healthy Recipes</span>
                            </div>
                            <div className="flex-1 bg-white/10 p-4 rounded-xl text-center">
                                <span className="block text-2xl font-bold">24/7</span>
                                <span className="text-sm opacity-70">Accessibility</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-slate-800 mb-8">Get In Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Our Office</h3>
                                    <p className="text-slate-500">123 Health Avenue, Tech Park<br />Bangalore, India 560001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Phone</h3>
                                    <p className="text-slate-500">+91 98765 43210</p>
                                    <p className="text-sm text-slate-400">Mon-Fri 9am to 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Email</h3>
                                    <p className="text-slate-500">support@waistraid.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-12">Meet The Creator</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="md:col-start-2 p-6 rounded-2xl bg-gray-50 flex flex-col items-center">
                                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden shadow-md">
                                    <img src={`https://ui-avatars.com/api/?name=${member.name}&background=16a34a&color=fff`} alt={member.name} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                                <p className="text-nutrition-green-600 font-medium text-sm mb-3">{member.role}</p>
                                <p className="text-slate-500 text-sm mb-6 max-w-xs">{member.desc}</p>

                                {/* Social Icons */}
                                <div className="flex gap-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-white text-blue-600 shadow-sm flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-white text-slate-800 shadow-sm flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-white text-sky-500 shadow-sm flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};



export default About;
