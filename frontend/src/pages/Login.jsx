import React, {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import {
  loginUser
} from "../services/authService";

const Login = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async () => {

      if (!email || !password) {

        toast.error(
          "Enter email and password"
        );

        return;

      }

      try {

        setLoading(
          true
        );

        const token =
          await loginUser({

            email,
            password

          });

        localStorage.setItem(

          "token",

          token

        );

        toast.success(
          "Login successful"
        );

        setTimeout(() => {

          navigate(
            "/dashboard"
          );

        }, 1000);

      }

      catch (error) {

        console.log(
          error
        );

        toast.error(
          "Invalid email or password"
        );

      }

      finally {

        setLoading(
          false
        );

      }

    };

  return (

    <div className="min-h-screen bg-slate-950 flex justify-center items-center">

      <div className="bg-slate-900 p-10 rounded-3xl w-[420px]">

        <h1 className="text-white text-4xl font-bold mb-8">

          Login

        </h1>

        <div className="space-y-5">

          <input

            type="email"

            value={email}

            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }

            placeholder="Email"

            className="w-full p-4 rounded-xl bg-slate-800 text-white"

          />

          <input

            type="password"

            value={password}

            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }

            placeholder="Password"

            className="w-full p-4 rounded-xl bg-slate-800 text-white"

          />

          <button

            onClick={handleLogin}

            className="w-full bg-cyan-500 p-4 rounded-xl text-white">

            {

              loading

                ? "Logging in..."

                : "Login"

            }

          </button>

          <Link

            to="/register"

            className="text-cyan-400 block text-center">

            Create account

          </Link>

        </div>

      </div>

    </div>

  );

};

export default Login;