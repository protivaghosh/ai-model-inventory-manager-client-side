import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';



export const AuthContext = createContext();



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

const provider = new GoogleAuthProvider(); 
  const signInWithGoogle = () =>
       signInWithPopup(auth, provider);

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };


  const saveUserToMongoDB = (user) => {
  fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log("MongoDB response:", data))
    .catch((err) => console.error(err));
};


  // Observe user state
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
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    saveUserToMongoDB

  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
