import { useState } from "react";
import AuthButton from "../components/common/AuthButton";
import AuthLayout from "../components/common/AuthLayout";
import InputFields from "../components/common/InputFields";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { SignupInput } from "@anuragmerndev/common-app";

function Signup() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      console.log({ signupData }, "from signup");
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signupData
      );

      const { message, body } = res.data;

      localStorage.setItem("token", body.ACCESS_TOKEN);

      toast.success(message);

      navigate("/blog");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return (
    <AuthLayout>
      <div className="flex justify-center items-center flex-col">
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold">Create an account</h1>
          <p className="text-sm text-gray-500">
            Already have an Account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="underline cursor-pointer"
            >
              Signin
            </span>
          </p>
        </div>
        <div className="w-2/5">
          <form onSubmit={onSubmit}>
            <InputFields
              required
              id="username"
              placeholder="Enter your username"
              type="text"
              label="Username"
              value={signupData.name as string}
              changeHandler={(e: React.FormEvent<HTMLInputElement>) =>
                setSignupData({
                  ...signupData,
                  name: e.currentTarget.value,
                })
              }
            />
            <InputFields
              required
              id="email"
              placeholder="Enter your email"
              type="email"
              label="Email"
              value={signupData.email}
              changeHandler={(e: React.FormEvent<HTMLInputElement>) =>
                setSignupData({ ...signupData, email: e.currentTarget.value })
              }
            />
            <InputFields
              required
              id="password"
              placeholder="Enter your password"
              type="password"
              label="Password"
              min={8}
              max={16}
              value={signupData.password}
              changeHandler={(e: React.FormEvent<HTMLInputElement>) =>
                setSignupData({
                  ...signupData,
                  password: e.currentTarget.value,
                })
              }
            />
            <AuthButton id="signupSubmit" type="submit" text="Signup" />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Signup;
