import { useState } from "react";
import AuthButton from "../components/common/AuthButton";
import AuthLayout from "../components/common/AuthLayout";
import InputFields from "../components/common/InputFields";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

function Signin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      console.log({ loginData }, "from signup");
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        loginData
      );

      const { message, body } = res.data;

      localStorage.setItem('token', body.ACCESS_TOKEN);

      toast.success(message);

      navigate("/blog");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
      }
    }
  }
  return (
    <AuthLayout>
      <div className="flex justify-center items-center flex-col">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold">Login to Account</h1>
          <p className="text-sm text-gray-500">
            Don't have an Account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="underline cursor-pointer"
            >
              Signup
            </span>
          </p>
        </div>
        <div className="w-2/4">
          <form onSubmit={onSubmit}>
            <InputFields
              id="email"
              placeholder="Enter your email"
              type="email"
              label="Email"
              value={loginData.email}
              required
              changeHandler={(e: React.FormEvent<HTMLInputElement>) =>
                setLoginData({ ...loginData, email: e.currentTarget.value })
              }
            />
            <InputFields
              required
              id="password"
              placeholder="Enter your password"
              type="password"
              label="Password"
              value={loginData.password}
              changeHandler={(e: React.FormEvent<HTMLInputElement>) =>
                setLoginData({ ...loginData, password: e.currentTarget.value })
              }
            />
            <AuthButton id="signinSubmit" type="submit" text="Signin" />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Signin;
