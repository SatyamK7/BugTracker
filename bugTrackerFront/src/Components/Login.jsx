import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:8080/api/users/getUser/${loginData.email}`);
            const user = response.data;

            if (user.password === loginData.password) {
                if(user.role==='TESTER') {
                    navigate('/tester');
                }else if(user.role==='DEVELOPER'){
                    navigate('/developer')
                }else if(user.role==='ADMIN') {
                    navigate('/admin')
                }else{
                    navigate('/manager');
                }
                
                // alert("Logged in successfully");
                
            } else {
                setErrorMessage("Invalid Credentials");
            }
        } catch (error) {
            setErrorMessage("User not found or server error");
            console.error(error);
        }
    };

    const goToRegistrationPage = () => {
        navigate('/registration');
    };

    return (
        <div className="bg-slate-500 grid place-items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-gray-600 p-8 rounded-xl shadow-md w-full max-w-md">
                <div className="">

                    {errorMessage && <h1 className="text-2xl text-red-900 font-bold">{errorMessage}</h1>}

                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md mb-4"
                        placeholder="abc@gmail.com"
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md mb-4"
                        placeholder="••••••••"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-blue-900 py-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>

                    <div className="border-1 mt-4"></div>
                    <div className="grid place-content-center mt-4">
                        <div>
                            <div className="flex justify-evenly items-center gap-4">
                                <div>If not registered</div>
                                <div>
                                    <button
                                        className="w-full bg-blue-600 rounded-2xl px-5 py-2 hover:bg-blue-900 cursor-pointer"
                                        onClick={goToRegistrationPage}
                                        type="button"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
