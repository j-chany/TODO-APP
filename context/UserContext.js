import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  createElement,
} from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();

  function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    return;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function checkIfdup(email) {
    const checking = await fetchSignInMethodsForEmail(auth, email);
    console.log(checking);
    if (checking.length === 0) return false;

    return true;
  }
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      // set curr user to user
      setCurrUser(user);
      // set loading to false
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = {
    currUser,
    login,
    logout,
    signup,
    userInfo,
    checkIfdup,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
