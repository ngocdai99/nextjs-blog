"use client";
import Link from "next/link";
import useSWR from "swr";
import AppTable from "~/components/app.table";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
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
    <main>
      <ul
        style={{
          display: "flex",
          gap: 8,
          flexDirection: "column",
          padding: 32,
        }}
      >
        <AppTable blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
        <Link className="nav-link" href={"/facebook"}>
          Face book
        </Link>
        <Link href={"/youtube"} className="nav-link">
          Youtube
        </Link>
        <Link href={"/tiktok"} className="nav-link">
          Tiktok
        </Link>
      </ul>
    </main>
  );
}
