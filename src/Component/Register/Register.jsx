import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, setUser, signInWithGoogle, saveUserToMongoDB } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // 🔒 Password Validation
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter (A-Z).");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter (a-z).");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        // Update Firebase profile
       updateProfile(user, {
          displayName: name,
           photoURL: photo,
})
          .then(() => {
            saveUserToMongoDB({ displayName: name, email, photoURL: photo });
            toast.success("Registration successful!");
            form.reset();
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("Profile update error:", error);
            toast.error("Profile update failed!");
          });
      })
      .catch((error) => {
        console.error("❌ Error creating user:", error.message);
        toast.error(error.message);
      });
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        saveUserToMongoDB(user);
        toast.success("Signed in with Google!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("❌ Google sign-in failed:", err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 border border-white/20 shadow-2xl rounded-2xl p-8 sm:p-10 text-white">
        <form onSubmit={handleRegister} className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-4">Register Now!</h2>

          <div>
            <label className="block text-sm mb-1 text-white/90">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md py-2 px-3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white/90">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="https://example.com/your-photo.jpg"
              className="w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md py-2 px-3"
            />
          </div>

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

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-md font-semibold border-none cursor-pointer hover:scale-[1.03] transition-transform duration-200 shadow-lg"
          >
            Register
          </button>

          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-white/30"></div>
            <span className="text-sm text-white/70">or</span>
            <div className="h-px w-16 bg-white/30"></div>
          </div>

          <button
            onClick={handleGoogleRegister}
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
            Already have an account?{" "}
            <Link to="/login" className="text-pink-300 hover:text-white underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
