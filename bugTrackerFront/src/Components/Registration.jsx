import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';


const Registration = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!formData.fullName || !formData.email || !formData.password || !formData.role) {
    alert("Please fill out all fields.");
    return;
  }

  // Prepare payload
  const payload = {
    name: formData.fullName, 
    email: formData.email,
    password: formData.password,
    role: formData.role.toUpperCase() // because backend expects uppercase roles
  };

  try {
    const response = await axios.post('http://localhost:8080/api/users/addUser', payload);
    console.log('Registration successful:', response.data);
    alert('User registered successfully!');
    // Redirect or reset form if needed
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Registration failed.');
  }
};


    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();
    const totheWelcomePage = () => {
        // setSuccessMessage("Registration done")

        if(formData.role === 'Developer') {
            console.log("developer page begins")
            navigate('/Developer')
        } else if(formData.role === 'Tester') {
            console.log("Tester page begins")
            navigate('/tester')
        }else if(formData.role === 'Admin') {
            console.log()
            navigate('/admin')
        }else if(formData.role === 'Manager') {
            navigate('/manager')
        }
        else{
        setTimeout(() => {
            navigate('/welcome');
        }, 2000);
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <form onSubmit={handleSubmit} className="bg-gray-600 p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Bug Tracker Registration</h2>

                <label className="block mb-2">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md mb-4"
                    placeholder="Your name"
                />

                <label className="block mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md mb-4"
                    placeholder="example@domain.com"
                />

                <label className="block mb-2">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md mb-4"
                    placeholder="••••••••"
                />

                <label className="block mb-2">Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md mb-6"
                >
                    <option value="">Select a role</option>
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                    <option value="Tester">Tester</option>
                    <option value="Manager">Manager</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-400 text-blue-900 py-2 rounded-md hover:bg-blue-600"
                    onClick={totheWelcomePage}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Registration;
