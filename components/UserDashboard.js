import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { set, useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import TodoCard from "./TodoCard";
import { useFetchTodos } from "../service/fetchTodos";

const UserDashboard = () => {
  const { currUser } = useUser();
  const { todos, setTodos, loading, error, addTodo, setAddTodo } =
    useFetchTodos();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editVal, setEditVal] = useState("");
  const handleClick = (e) => {
    setAddTodo(true);
  };

  const handleAddtask = async (data) => {
    const key =
      Object.keys(todos).length === 0 ? 1 : Object.keys(todos).length + 1;
    setTodos({ ...todos, [key]: data.todoItem });
    const userRef = doc(db, "users", currUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [key]: data.todoItem,
        },
      },
      { merge: true }
    );
    setAddTodo(false);
    reset();
  };

  const handleEdit = async () => {
    if (!editVal) return;
    const key = editIndex;
    const userRef = doc(db, "users", currUser.uid);
    setTodos({ ...todos, [key]: editVal });
    await setDoc(
      userRef,
      {
        todos: {
          [key]: editVal,
        },
      },
      { merge: true }
    );
    setEdit(false);
    setEditIndex(null);
    setEditVal("");
  };

  const handleDelte = async () =>{

  }

  return (
    <>
      <div className=" font-bold text-xs w-full max-w-[65ch] flex flex-col mx-auto gap-3 sm:gap-5">
        {addTodo && (
          <form
            className="flex items-stretch"
            onSubmit={handleSubmit(handleAddtask)}
          >
            <input
              type="text"
              placeholder="Enter todo"
              className="text-slate-900 text-base sm:text-3xl outline-none p-3 flex-1"
              {...register("todoItem", { required: true })}
              aria-invalid={errors.todoItem ? "true" : "false"}
            ></input>
            <button
              type="submit"
              className="w-fit  px-4 text-base font-bold duration-300 hover:text-xl bg-pink-700 "
            >
              ADD
            </button>
          </form>
        )}
        {!addTodo && (
          <button
            onClick={handleClick}
            className="py-2 px-5 rounded-lg text-center uppercase text-3xl border border-solid border-cyan-300 duration-200 hover:opacity-30 "
          >
            ADD TODO
          </button>
        )}

        {!loading && (
          <>
            {Object.keys(todos).map((todo, i) => {
              return (
                <TodoCard
                  key={i}
                  setEdit={setEdit}
                  edit={edit}
                  setEditVal={setEditVal}
                  index={i}
                  setEditIndex={setEditIndex}
                  editIndex={editIndex}
                  edithandler={handleEdit}
                  editVal={editVal}
                >
                  {todos[todo]}
                </TodoCard>
              );
            })}
          </>
        )}
        {loading && (
          <i className=" animate-spin text-3xl fa-solid fa-spinner"></i>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
