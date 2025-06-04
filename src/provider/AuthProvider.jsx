import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";




export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
       
    const [user,setUser] = useState(null);
    const [loading,setLoading]=useState(true);
   

    const createUser = (email,password)=>{
        setLoading(true);
     return createUserWithEmailAndPassword(auth, email, password);
     
    };

     const updateUser =(updatedData)=>{
      return updateProfile(auth.currentUser,updatedData);
    }

     const signIn = (email,password) =>{
         setLoading(true);
        
        return signInWithEmailAndPassword(auth,email,password);
    };

     const googleSign =()=>{
       return signInWithPopup(auth, provider);
    };

    const logOut =()=>{
        return signOut(auth);
     };


     useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
            setLoading(false);
            
        });
        
        return () => {
            unsubscribe();
        };
    },[])
   
    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        googleSign,
        loading,
        setLoading,
        updateUser
    }

    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;