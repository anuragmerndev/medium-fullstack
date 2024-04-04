import { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../config";
import ContentEditor from "../components/common/ContentEditor";

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function createBlogHandler(e: FormEvent) {
    e.preventDefault();
    const authToken = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success(res.data.message);
      navigate("/blog");
    } catch (error) {
      console.log({ error });
      toast.error("something went wrong");
      //   navigate("/blog");
    }
  }
  return (
    <ContentEditor
      buttonText="publish"
      clickHandler={createBlogHandler}
      content={content}
      setContent={setContent}
      title={title}
      setTitle={setTitle}
    />
  );
}

export default CreateBlog;
