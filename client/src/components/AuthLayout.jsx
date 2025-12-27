import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
                    {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
                </div>
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
