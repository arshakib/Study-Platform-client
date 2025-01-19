import { createContext, useEffect, useState } from "react";
import auth from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const Provider = new GoogleAuthProvider();

  const google = () => {
    return signInWithPopup(auth, Provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          role: "student",
        };

        return axios
          .post("http://localhost:5000/users", userData)
          .then((res) => console.log("Server Response:", res))
          .catch((error) => console.error("Axios Error:", error));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Reg = async (email, password, name, Photo) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: Photo,
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const reset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const update = (name, url) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axios
          .post("http://localhost:5000/jwt", { email: currentUser.email })
          .then((data) => {
            if (data.data.token) {
              localStorage.setItem("access-token", data.data.token);
            }
          })
          .catch((error) => {
            console.error("Error fetching token:", error);
          });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const object = {
    Reg,
    login,
    user,
    setUser,
    loading,
    logout,
    google,
    reset,
    update,
  };
  return <AuthContext.Provider value={object}>{children}</AuthContext.Provider>;
};

export default Context;
