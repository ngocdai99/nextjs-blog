"use client";
import { useRouter } from "next/navigation";
import Button from 'react-bootstrap/Button';

const Facebook = () => {
  const router = useRouter();
  const handleBtn = () => {
    router.push("/");
  };
  return (
    <>
      Facebook
      <div>
        <Button variant="danger">Hoi dan it</Button>
        <button onClick={handleBtn}>back home</button>
      </div>
    </>
  );
};

export default Facebook;
