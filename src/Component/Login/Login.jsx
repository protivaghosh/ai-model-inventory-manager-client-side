import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, setUser, signInWithGoogle,  saveUserToMongoDB } =
    useContext(AuthContext);

  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login successful!");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
       saveUserToMongoDB({
  name: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
});
        toast.success("Google sign-in successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };

 

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 border border-white/20 shadow-2xl rounded-2xl p-8 sm:p-10 text-white">
        <form onSubmit={handleLogin} className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-4">Login Now!</h2>

          <div>
            <label className="block text-sm mb-1 text-white/90">Email</label>
            <input
              type="email"
              name="email"
             placeholder="example@email.com"
              className="w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md py-2 px-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white/90">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md py-2 px-3"
            />
          </div>

          <p className="text-sm text-white/80 cursor-pointer">
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-md font-semibold border-none cursor-pointer hover:scale-[1.03] transition-transform duration-200 shadow-lg"
          >
            Login
          </button>

          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-white/30"></div>
            <span className="text-sm text-white/70">or</span>
            <div className="h-px w-16 bg-white/30"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer shadow-md"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-white/80 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-300 hover:text-white underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
