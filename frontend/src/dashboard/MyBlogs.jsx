import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  
  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/my-blog",
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch blogs");
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4001/api/blogs/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Blog deleted successfully");
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="lg:ml-64 transition-all duration-300">
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">My Blogs</h2>
        {myBlogs && myBlogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {myBlogs.map((blog) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                key={blog._id}
              >
                {blog?.blogImage?.url && (
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                    {blog.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${blog._id}`}
                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              You haven't posted any blogs yet!
            </p>
            <Link
              to="/create-blog"
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Blog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;