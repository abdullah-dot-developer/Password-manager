import React, { useEffect, useRef, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef(null);
  const passwordRef = useRef();
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    const req = await fetch("http://localhost:3000/");
    const passwords = await req.json();
    setPasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/hidden.png")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/hidden.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      toast("Password saved Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const updatedPasswordArray = [
        ...passwordArray,
        { ...form, id: uuidv4() },
      ];
      setPasswordArray(updatedPasswordArray);
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      // console.log(updatedPasswordArray);
    } else {
      toast("Minimum field length is 3 characters!");
    }
  };
  const deletePassword = async (id) => {
    toast("Password Deleted Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // console.log("Password deleted whose id is ", id);
    let c = confirm("Do you really want to delete this password");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setForm({ site: "", username: "", password: "" });
    }
  };
  const editPassword = (id) => {
    // console.log(passwordArray.filter((item) => item.id === id));
    setForm({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full ">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-200 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 md:p-0  md:mycontainer ">
        <h1 className="text-4xl font-bold text-center pt-6">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                ref={passwordRef}
              />
              <span
                onClick={showPassword}
                className="absolute right-2 top-1 cursor-pointer"
              >
                <img ref={ref} width={25} src="/hidden.png" alt="showIcon" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-500 rounded-full px-6 py-2 w-fit hover:bg-green-400 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>Not Passwords saved to Show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-lg overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center min-w-32 py-2 border border-white">
                        <div className=" flex items-center justify-center gap-4 ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <IoCopy
                            onClick={() => copyText(item.site)}
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                      <td className=" text-center min-w-32 py-2 border border-white">
                        <div className=" flex items-center justify-center gap-4 ">
                          {item.username}
                          <IoCopy
                            onClick={() => copyText(item.username)}
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                      <td className="  text-center min-w-32 py-2 border border-white">
                        <div className=" flex items-center justify-center gap-4 ">
                          {"*".repeat(item.password.length)}
                          <IoCopy
                            onClick={() => copyText(item.password)}
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                      <td className="flex justify-center gap-4 items-center  text-center min-w-32 py-2 border border-white">
                        <span>
                          <FaEdit
                            onClick={() => editPassword(item.id)}
                            width={100}
                            className="cursor-pointer"
                          />
                        </span>
                        <span>
                          <lord-icon
                            onClick={() => deletePassword(item.id)}
                            className="cursor-pointer"
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
