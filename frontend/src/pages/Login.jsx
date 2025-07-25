import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { shopContext } from "../context/Shopcontext";
import { toast } from "react-toastify";

const Login = () => {
  const { backend_url, setToken, token, navigate } = useContext(shopContext);
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    if (currentState === "Sign Up") {
      const response = await axios.post(`${backend_url}/api/user/register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.message);
      }
    } else {
      const response = await axios.post(`${backend_url}/api/user/login`, {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast(response.data.message);
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.message);
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Something went wrong. Please try again.");
  }
};
useEffect(() => {
  if (token) {
    navigate("/");
  }
}, [token, navigate]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-[90%] sm:max-w-90 m-auto mt-14 gap-4 text-gray-800 flex flex-col items-center "
    >
      <div className="mt-10 mb-2  inline-flex items-center gap-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="w-8 h-[1.5px] bg-gray-800 border-none " />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p>Forgot your password ?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here.
          </p>
        )}
      </div>
      <button className="bg-black text-white px-8 py-2 mt-4 font-light">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
