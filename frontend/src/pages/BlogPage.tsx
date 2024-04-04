import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BlogCardTypes } from "../types/components/common/BlogCard";
import SecuredComponent from "../components/common/SecuredComponent";
import useApiCall from "../hooks/useApiCall";
import SkeletonLoader from "../components/common/SkeletonLoader";

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Partial<BlogCardTypes>>({
    content: "",
    title: "",
    author: "",
  });

  const { data, loading } = useApiCall(`blog/${id}`);

  useEffect(() => {
    if(!data) return;
    setBlog({
      content: data.content,
      author: data.author?.name,
      date: data.created_at,
      title: data.title
    })
  }, [data]);

  if (loading) {
    return (
      <SecuredComponent>
        <div className="grid grid-cols-3 mx-16 mt-20 gap-4">
          <div className="col-span-2">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
          <div>
            <SkeletonLoader />
          </div>
        </div>
      </SecuredComponent>
    );
  }
  return (
    <SecuredComponent>
      <div className="grid grid-cols-3 mx-16 mt-20 gap-4">
        <div className="col-span-2">
          <h2 className="text-3xl mb-4 font-bold">{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
        <div>
          <h2>{blog.author}</h2>
        </div>
      </div>
    </SecuredComponent>
  );
}

export default BlogPage;
