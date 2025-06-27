"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

type CreateModalProps = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};
const CreateModal: React.FC<CreateModalProps> = ({
  visible,
  setVisible,
}) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = () => {
    if (!title) {
      toast.error("Not empty title");
      return;
    }
    if (!author) {
      toast.error("Not empty author");
      return;
    }
    if (!content) {
      toast.error("Not empty content");
      return;
    }
    fetch("http://localhost:8000/blogs", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title, author, content }),
    })
      .then(function (res) {
        toast.success("Create success");
        handleCloseModal();
        mutate("http://localhost:8000/blogs");
      })
      .catch(function (res) {
        toast.warning("Create failed");
      });
  };

  const handleCloseModal = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setVisible(false);
  };
  return (
    <>
      <Modal
        show={visible}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                type="text"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                onChange={(e) => setContent(e.target.value)}
                value={content}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateModal;
