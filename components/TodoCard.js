import React from "react";

const TodoCard = (props) => {
  const {
    children,
    edit,
    setEdit,
    index,
    setEditIndex,
    editIndex,
    edithandler,
    editVal,
    setEditVal,
  } = props;

  const handleClick = (e) => {
    setEdit(true);
    setEditIndex(index);
  };
  return (
    <div className="p-2 sm:p-3 text-xl flex items-stretch border rounded-lg border-white border-solid ">
      <div className="flex-1 ">
        {!edit || editIndex !== index ? (
          <>{children}</>
        ) : (
          <>
            <input
              className="outline-none bg-inherit "
              onChange={(e) => setEditVal(e.target.value)}
            ></input>
            <div className="flex items-stretch justify-between">
              <button type="button" onClick={edithandler}>
                <i className="fa-solid fa-check text-2xl px-2 duration-300 hover:scale-150"></i>
              </button>
              <button
                onClick={(e) => {
                  setEditVal("");
                  setEdit(false);
                }}
                type="button"
              >
                <i className="fa-solid fa-xmark text-2xl px-2 duration-300 hover:scale-150"></i>
              </button>
            </div>
          </>
        )}
      </div>

      {!edit && (
        <div className="flex items-center">
          <i
            onClick={() => {
              setEdit(true);
              setEditIndex(index);
            }}
            className="fa-solid fa-pen px-2 duration-300 hover:scale-125 "
          ></i>
          <i
            onClick={() => {
              console.log("delete");
            }}
            className="fa-sharp fa-solid fa-trash px-2 duration-150 hover:scale-125 "
          ></i>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
