import React, { useState } from "react";
import Modal from "./Modal";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className="sticky top-0 w-full left-0 flex bg-inherit items-center justify-between p-4  border-b border-solid border-white">
        <h1 className="text-3xl sm:text-6xl ">To do App</h1>
        <div>
          <i
            onClick={() => setOpenModal(true)}
            className="fa-regular fa-user text-2xl hover:opacity-40 sm:text-4xl cursor-pointer"
          ></i>
        </div>
      </div>
    </>
  );
}
