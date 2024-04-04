import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { BlogCardData } from "../types/components/common/BlogCard";
import { useNavigate } from "react-router-dom";

function useApiCall(endpoint: string) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<BlogCardData | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === "token expired") {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      }
    }
    console.log({ data }, "hehe");
  }, []);

  return {
    loading,
    data,
  };
}

export default useApiCall;
