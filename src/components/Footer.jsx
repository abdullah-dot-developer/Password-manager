import React from "react";

const Footer = () => {
  return (
    <div className="flex gap-4 font-bold items-center justify-center bg-slate-900 p-3 text-white fixed bottom-0 w-full text-center">
      Developed with <img width={30} src="/heart.png" alt="LoveIcon" /> by{" "}
      <a href="https://www.abdullah-dot-programmer.com">
        <img className="invert" width={30} src="/github.png" alt="GitHubLogo" />
      </a>
    </div>
  );
};

export default Footer;
