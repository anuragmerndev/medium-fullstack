import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BlogCard from "../components/common/BlogCard";
import SecuredComponent from "../components/common/SecuredComponent";
import { BACKEND_URL } from "../config";
import { BlogDataType } from "../types/pages/Blog";
import Spinner from "../components/common/Spinner";

function Blog() {
  const [blogs, setBlogs] = useState<BlogDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    async function getPosts() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setBlogs(res.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          console.log(error.response);
          if (error.response?.data.message === "token expired") {
            localStorage.removeItem("token");
            navigate("/signin");
          }
        }
      }
    }

    getPosts();
  }, []);

  if (loading) {
    return (
      <SecuredComponent>
         <div className="grid place-content-center h-dvh">
          <Spinner />
        </div>
      </SecuredComponent>
    );
  }

  if (!blogs.length) {
    return (
      <SecuredComponent>
        <div className="grid items-center">No blogs</div>
      </SecuredComponent>
    );
  }

  return (
    <SecuredComponent>
      <div className="grid grid-cols-3 mx-16 mt-20 gap-4">
        <div className="col-span-2">
          {blogs.length
            ? blogs.map((blog, ind) => (
                <div
                  key={blog.id}
                  className={ind === blogs.length - 1 ? "" : "border-b-2"}
                >
                  <BlogCard
                    date={blog.created_at}
                    blogId={blog.id}
                    title={blog.title}
                    content={`${blog.content.substring(0, 300)}...`}
                    author={blog.author ? blog.author.name : ""}
                  />
                </div>
              ))
            : null}
        </div>
        <div>
          {blogs.length ? (
            <BlogCard
              date={blogs[0].created_at}
              blogId={blogs[0].id}
              title={blogs[0].title}
              content={`${blogs[0].content.substring(0, 300)}...`}
              author={blogs[0].author ? blogs[0].author.name : ""}
            />
          ) : null}
        </div>
      </div>
    </SecuredComponent>
  );
}

export default Blog;
