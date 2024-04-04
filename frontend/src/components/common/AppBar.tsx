import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StyledBtn from "./StyledBtn";

function AppBar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("user logged out !");
    navigate("/signin");
  }

  return (
    <div className="flex justify-between items-center text-lg px-4 py-2 border-b-2 w-full fixed top-0 bg-white">
      <div onClick={() => navigate("/blog")} className="cursor-pointer">
        Medium
      </div>
      <div className="flex gap-4">
        <StyledBtn
        clickHandler={() => navigate("/blog/create")}
          text='Create Story'
          type="button"
          bgColor="green-500"
          id="createBlog"
          hover="bg-green-950"
        />
        <StyledBtn
          id="authBtn"
          text={"Logout"}
          clickHandler={handleLogout}
          type="button"
          bgColor={"red-800"}
          hover={"bg-red-900"}
        />
      </div>
    </div>
  );
}

export default AppBar;
