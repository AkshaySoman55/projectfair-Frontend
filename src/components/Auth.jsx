import {
  faArrowRight,
  faCubesStacked,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginApi, registerAPI } from "../pagess/services/allApi";
import "react-toastify/dist/ReactToastify.css";
import { logoutResponseContext } from "../context/ContextShare";

function Auth({ register }) {

  const {AuthorToken, setAuthorToken} = useContext(logoutResponseContext)
  //state to store data

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  console.log(userData);

  const RegisterForm = register ? true : false;

  //function to register an user

  const handleRegister = async (e) => {
    //to prevent the data loss
    e.preventDefault();
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      toast.info(`please fill the form completely`);
    } else {
      //api call

      const result = await registerAPI(userData);
      console.log(result);
      if (result.status == 200) {
        toast.success("Registration successfull");
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        toast.error(result.response.data);
      }
    }
  };

  //function to login

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (!email || !password) {
      toast.info("please fill the form completely");
    } else {
      const result = await loginApi(userData);
      console.log(result);
      if (result.status == 200) {
        //adding data to section storage
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))

        sessionStorage.setItem("token",result.data.token)

        toast.success("Login successfull");
        setAuthorToken(true)
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate('/')
          
        }, 2000);
      }
    }
  };

  return (
    <>
      <div
        className="w-100 d-flex justify-content-center align-items-center mb-5 mt-3"
        style={{ height: "100vh" }}
      >
        <div className="w-75 container">
          <Link to={"/"} style={{ textDecoration: "none", color: "blue" }}>
            {" "}
            <h5 className="mt-4">
              Back to home{" "}
              <FontAwesomeIcon className="me-3" icon={faArrowRight} />
            </h5>
          </Link>

          <div
            className="p-md-5 rounded text-light shadow "
            style={{ backgroundColor: "green" }}
          >
            <div className="row align-items-center">
              <div className="col-md-6 d-flex justify-content-center">
                <img
                  src="https://cdn.pixabay.com/photo/2021/03/23/09/08/login-6116861_1280.png"
                  className="w-100 p-4"
                  alt="img"
                />
              </div>

              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column p-md-3">
                <h2>
                  <FontAwesomeIcon
                    icon={faCubesStacked}
                    className="me-3 fs-1"
                  />
                  Project Fair
                </h2>

                <h5 className="mt-3">
                  {RegisterForm
                    ? " Sign up to your Account"
                    : "Sign in to Your Account"}
                </h5>

                <form className="mt-3 w-100 p-3 p-md-5">
                  {RegisterForm && (
                    <input
                      type="text"
                      placeholder="Enter Username"
                      className="form-control"
                      value={userData.username}
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                    />
                  )}

                  <input
                    type="text"
                    placeholder="Enter Email Id"
                    className="form-control mt-3"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Enter Password"
                    className="form-control mt-3"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  />

                  {RegisterForm ? (
                    <div>
                      <button
                        onClick={handleRegister}
                        className="btn btn-warning mt-4 w-100"
                      >
                        Register
                      </button>
                      <p className="mt-2">
                        Already a User? click Here to{" "}
                        <Link
                          to={"/login"}
                          style={{ color: "red", textDecoration: "none" }}
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={handlelogin}
                        className="btn btn-warning mt-4 w-100"
                      >
                        Login
                      </button>
                      <p className="mt-2">
                        New User? click Here to{" "}
                        <Link
                          to={"/register"}
                          style={{ color: "red", textDecoration: "none" }}
                        >
                          Register
                        </Link>
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
}

export default Auth;
