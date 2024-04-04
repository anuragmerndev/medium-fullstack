import { useNavigate } from "react-router-dom";
import { BlogCardTypes } from "../../types/components/common/BlogCard";
import { useMemo } from "react";

function BlogCard({ author, title, content, blogId, date }: BlogCardTypes) {
  const navigate = useNavigate();

  function clickHandler() {
    navigate(`/blog/${blogId}`);
  }

  const formattedDate = useMemo(() => {
    const blogdate = new Date(date).toDateString();
    return blogdate;
  }, [date]);

  return (
    <div className="my-2 px-2 cursor-pointer" onClick={clickHandler}>
      <div>
        {author ? <span className="bg-gray-600 rounded-full align-middle text-white h-8 w-8 text-center inline-block mr-2">{author[0]}</span> : <></>}
        <span className="text-sm text-gray-500 mb-2">
          {author} - {formattedDate}
        </span>
      </div>
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-sm mb-2">{content}</p>
    </div>
  );
}

export default BlogCard;
