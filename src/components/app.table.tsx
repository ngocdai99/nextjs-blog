"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import CreateModal from "./modal/create.modal";
import UpdateModal from "./modal/update.modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { mutate } from "swr";
type TableProp = {
  blogs: Blog[];
};
const AppTable: React.FC<TableProp> = ({ blogs }) => {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleOpenUpdate = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowUpdate(true);
  };

  const handleDelete = (blog: Blog) => {
    if (confirm(`Bạn chắc chắn muốn xóa blog: ${blog.title}`) == true) {
      fetch(`http://localhost:8000/blogs/${blog.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
        .then(function (res) {
          toast.success("Delete success");
          mutate("http://localhost:8000/blogs");
        })
        .catch(function (res) {
          toast.warning("Delete failed");
        });
    }
  };

  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table Blogs</h3>
        <Button onClick={() => setShowCreate(true)} variant="secondary">
          Add new blogs
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog: Blog) => {
            return (
              <tr>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <Button
                    onClick={() => {
                      router.push(`/blogs/${blog.id}`);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleOpenUpdate(blog)}
                    variant="warning"
                    className="mx-3"
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(blog)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <CreateModal visible={showCreate} setVisible={setShowCreate} />

      {selectedBlog != null && (
        <UpdateModal
          blog={selectedBlog}
          visible={showUpdate}
          setVisible={setShowUpdate}
        />
      )}
    </>
  );
};

export default AppTable;
