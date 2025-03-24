import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../AppWrite/config';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const session = await service.login(formData);
            if (session) {
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-dark-primary dark:bg-light-secondary flex items-center justify-center">
            <div className="bg-dark-secondary dark:bg-light-five p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-white dark:text-light-six mb-6">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white dark:text-light-six mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 rounded bg-dark-tertiary dark:bg-light-six text-white"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white dark:text-light-six mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 rounded bg-dark-tertiary dark:bg-light-six text-white"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;