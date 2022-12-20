import React from "react";

export default function Footer() {
  return (
    <div className="flex justify-center items-center gap-5 py-4 sm:text-4xl text-2xl">
      <a href="https://www.instagram.com/im_jchany/">
        <i className="fa-brands fa-instagram duration:300 hover:opacity-30"></i>{" "}
      </a>
      <a href="">
        <i className="fa-brands fa-linkedin-in duration:300 hover:opacity-30"></i>
      </a>
      <a href="">
        <i className="fa-brands fa-facebook duration:300 hover:opacity-30"></i>
      </a>
      <a href="">
        <i className="fa-brands fa-github duration:300 hover:opacity-30"></i>
      </a>
    </div>
  );
}
