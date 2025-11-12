import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signInWithGoogle = () => signInWithPopup(auth, provider);
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  

  const saveUserToMongoDB = (user) => {
    return fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
   
    saveUserToMongoDB,
    updateProfile,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
