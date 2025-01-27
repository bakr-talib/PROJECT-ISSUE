import { useState } from 'react';
import SignUp from './SingUp';
 // Import the SignUp component

function Login() {
  const [showSignUp, setShowSignUp] = useState(false);  // State to toggle between SignUp and Login

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:1337/api/issues', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login successful!');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      alert('API connection error');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      {!showSignUp ? (
        <>
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password} 
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
          </form>
          <button
            className="w-full bg-gray-500 text-white p-2 rounded mt-4"
            onClick={() => setShowSignUp(true)}  // When clicked, show SignUp component
          >
            Don't have an account? Sign up now
          </button>
        </>
      ) : (
       <SignUp></SignUp>  // Display the SignUp component when the button is clicked
      )}
    </div>
  );
}

export default Login;
