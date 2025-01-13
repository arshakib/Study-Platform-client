import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Context/Context";
import axios from "axios";

const Register = () => {
  const { Reg, google } = useContext(AuthContext);

  const navigate = useNavigate();

  const handelLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const email = form.email.value;
    const role = form.role.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!regex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter and one lowercase letter",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=90e8400173b8e420a6134c2a5baa3d33`,
      formData
    );
    const user = {
      name,
      photoURL: data.data.url,
      email,
      role,
      password,
    };

    console.log(user);

    Reg(user.email, user.password, user.name, user.photoURL)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        navigate("/");
        try {
          axios.post("http://localhost:5000/users", user).then((response) => {
            console.log(response);
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage, errorCode, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Register Title */}
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {/* Register Form */}
        <form onSubmit={handelLogin} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Photo URL Field */}
          <div>
            <label
              htmlFor="photo"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Photo
            </label>
            <div className="form-control">
              <input type="file" name="image" required />
            </div>
          </div>

          <label className="form-control w-full max-w-xs">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-2"
            >
              Select your Role
            </label>
            <select name="role" className="select select-bordered">
              <option disabled selected>
                Pick one
              </option>
              <option>student</option>
              <option>tutor</option>
              <option>admin</option>
            </select>
          </label>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={google}
          className="w-full flex items-center justify-center bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          <FaGoogle className="mr-2" />
          Sign up with Google
        </button>

        {/* Login Link */}
        <p className="text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
