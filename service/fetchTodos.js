import React, { useState, useEffect, useRef, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "../context/UserContext";
import { db } from "../firebase";

export const useFetchTodos = () => {
  const { currUser } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState({});
  const [addTodo, setAddTodo] = useState(true);
  async function getList() {
    try {
      const ref = doc(db, "users", currUser.uid);
      const data = await getDoc(ref);
      if (data.exists()) {
        if (Object.keys(data.data()).length == 0) {
          setTodos({});
        } else {
          console.log(todos);
          setTodos(data.data().todos);
        }
      }
    } catch (err) {
      setError("fail to load todos");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getList();
  }, [addTodo]);

  return {
    loading,
    error,
    todos,
    addTodo,
    setAddTodo,
    setTodos,
  };
};
