import React, {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import {
  registerUser
} from "../services/authService";

const Register = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",

      password: ""

    });

  const [loading, setLoading] =
    useState(false);

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

  };

  const handleRegister =
    async () => {

      if (

        !formData.email ||

        !formData.password

      ) {

        toast.error(
          "All fields are required"
        );

        return;

      }

      if (

        formData.password.length < 6

      ) {

        toast.error(
          "Password must be at least 6 characters"
        );

        return;

      }

      try {

        setLoading(
          true
        );

        await registerUser(

          formData

        );

        toast.success(
          "Registration successful"
        );

        setTimeout(() => {

          navigate(
            "/login"
          );

        }, 1000);

      }

      catch (error) {

        console.log(
          error
        );

        if (

          error.response?.status === 409

        ) {

          toast.error(
            "Email already exists"
          );

        }

        else {

          toast.error(
            "Registration failed"
          );

        }

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

          Register

        </h1>

        <div className="space-y-5">

          <input

            name="email"

            type="email"

            value={formData.email}

            onChange={handleChange}

            placeholder="Enter Email"

            className="w-full p-4 rounded-xl bg-slate-800 text-white"

          />

          <input

            name="password"

            type="password"

            value={formData.password}

            onChange={handleChange}

            placeholder="Enter Password"

            className="w-full p-4 rounded-xl bg-slate-800 text-white"

          />

          <button

            onClick={handleRegister}

            disabled={loading}

            className="w-full bg-cyan-500 p-4 rounded-xl text-white">

            {

              loading

                ? "Registering..."

                : "Register"

            }

          </button>

          <Link

            to="/login"

            className="text-cyan-400 block text-center">

            Already have an account?

          </Link>

        </div>

      </div>

    </div>

  );

};

export default Register;