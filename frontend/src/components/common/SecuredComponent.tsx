import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "./AppBar";

function SecuredComponent({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <AppBar />
      {children}
    </>
  );
}

export default SecuredComponent;
