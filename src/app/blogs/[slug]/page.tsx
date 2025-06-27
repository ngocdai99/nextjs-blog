"use client";
import Card from "react-bootstrap/Card";

import useSWR, { Fetcher } from "swr";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/navigation";
const BlogDetail = ({ params }: { params: { slug: string } }) => {
  console.log("check slug", params.slug);
  const router = useRouter();

  
  const fetcher: Fetcher<Blog, string> = (url: string) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.slug}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log("data", data);
  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <>
      <Button variant="secondary" onClick={() => router.back()}>
        Go Back
      </Button>
      <Card style={{ width: "100%", marginBottom: 32, marginTop: 32 }}>
        <Card.Header>{data?.title}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>ID: {data?.id}</ListGroup.Item>
          <ListGroup.Item>Author: {data?.author}</ListGroup.Item>
          <ListGroup.Item>Content: {data?.content}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default BlogDetail;
