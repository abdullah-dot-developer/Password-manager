import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-6 ">
        <div className="logo font-bold text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-5">
            <a className="hover:font-bold" href="">
              Home
            </a>
            <a className="hover:font-bold" href="">
              About
            </a>
            <a className="hover:font-bold" href="">
              Contact
            </a>
          </li>
        </ul> */}
        <div className="">
          <img
            width={30}
            className="invert cursor-pointer"
            src="/github.png"
            alt="GitHubLogo"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
