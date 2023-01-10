import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
const Layout = (props) => {
  const { children } = props;
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="flex flex-col min-h-screen relative text-white bg-slate-900" > 
      <Header />
      <main className="flex-1 flex flex-col p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
