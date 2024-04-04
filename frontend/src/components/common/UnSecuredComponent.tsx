import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UnSecuredComponent({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/blog");
    }
  }, []);

  return <>{children}</>;
}

export default UnSecuredComponent;
